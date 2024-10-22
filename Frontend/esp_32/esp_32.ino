#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include "MAX30105.h"

// Undefine conflicting macro before including spo2_algorithm.h
#undef FreqS

#include "spo2_algorithm.h" // For accurate SpO2 and heart rate calculation

// WiFi credentials
const char* ssid = "Redmi 9T";
const char* password = "miriam610";

// MQTT broker settings
const char* mqtt_server = "192.168.89.200";
const int mqtt_port = 1883;
const char* mqtt_topic = "sensor/data";

// DHT11
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// MAX30105 sensor
MAX30105 particleSensor;

// Variables for peak detection and SpO2 calculation
#define BUFFER_SIZE 100 // Buffer size for heart rate and SpO2 calculation
uint32_t irBuffer[BUFFER_SIZE];  // Infrared LED sensor data
uint32_t redBuffer[BUFFER_SIZE]; // Red LED sensor data

int32_t spo2 = 0;         // SpO2 value
int8_t validSPO2 = 0;     // Indicator to show if the SpO2 calculation is valid
int32_t heartRate = 0;    // Heart rate value
int8_t validHeartRate = 0;// Indicator to show if the heart rate calculation is valid

// Variables for debouncing and smoothing
const int validHeartRateMin = 50; // Minimum valid heart rate
const int validHeartRateMax = 180; // Maximum valid heart rate
const int validSpO2Min = 70;  // Minimum valid SpO2
const int validSpO2Max = 100; // Maximum valid SpO2

const int rateSize = 4;  // Size of the smoothing window for heart rate
float rateBuffer[rateSize];  // Buffer to hold last few heart rate values
int rateIndex = 0;   // Index for current heart rate entry
bool hasValidData = false;  // Indicator for valid readings

// User ID
const char* user_id = "6bc210b6-900c-4c92-a91f-d66e697f3dc0"; // Replace with dynamic user ID if necessary

// MQTT client
WiFiClient espClient;
PubSubClient client(espClient);

// Function to connect to WiFi
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// Function to reconnect to MQTT broker
void reconnect() {
  if (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

// Function to initialize the MAX30105 sensor
void initializeSensor() {
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 initialization failed!");
    while (1);
  }
  
  // Set up the sensor with preferred parameters
  particleSensor.setup(60, 4, 2, 100, 411, 4096); // Configure the sensor (brightness, sample average, LED mode, etc.)
}

// Function to apply a moving average filter to heart rate values
float applyMovingAverage(float newSample, float* sampleArray, int arraySize) {
  float sum = 0;
  for (int i = 1; i < arraySize; i++) {
    sampleArray[i - 1] = sampleArray[i]; // Shift the samples
    sum += sampleArray[i - 1];
  }
  sampleArray[arraySize - 1] = newSample; // Add the new sample
  sum += newSample;
  return sum / arraySize;
}

// Function to read heart rate and SpO2 using the Maxim algorithm in real-time
void readHeartRateAndSpO2() {
  // Fill buffers with readings in real-time
  for (int i = 0; i < BUFFER_SIZE; i++) {
    while (particleSensor.available() == false) {
      particleSensor.check(); // Wait for new data
    }

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); // Move to the next sample
  }

  // Calculate heart rate and SpO2 using the Maxim algorithm
  maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  // Validate data and filter out impossible values
  if (validHeartRate && heartRate >= validHeartRateMin && heartRate <= validHeartRateMax) {
    // Apply moving average filter to smooth heart rate
    heartRate = applyMovingAverage(heartRate, rateBuffer, rateSize);
  } else {
    Serial.println("Invalid or noisy heart rate detected, skipping...");
    heartRate = -1; // Set as invalid
  }

  if (validSPO2 && spo2 >= validSpO2Min && spo2 <= validSpO2Max) {
    // SpO2 is valid, continue processing
  } else {
    Serial.println("Invalid or noisy SpO2 detected, skipping...");
    spo2 = -1; // Set as invalid
  }

  hasValidData = (heartRate > 0 && spo2 > 0);
  if (hasValidData) {
    Serial.println("Valid real-time heart rate and SpO2 captured.");
  }
}

// Function to estimate blood pressure (placeholder method)
void estimateBloodPressure(float heartRate, float spo2, float &systolicBP, float &diastolicBP) {
  if (heartRate > 0 && spo2 > 0) {  // Only estimate BP with valid data
    systolicBP = 120 + (heartRate - 70) * 0.5 + (100 - spo2) * 0.25;
    diastolicBP = 80 + (heartRate - 70) * 0.3 + (100 - spo2) * 0.15;

    // Constrain the values within realistic bounds
    systolicBP = constrain(systolicBP, 90, 180);
    diastolicBP = constrain(diastolicBP, 60, 120);
  } else {
    systolicBP = 0;
    diastolicBP = 0;
  }
}

// Function to publish sensor data to MQTT
void publishSensorData(float temperature, float humidity, float heartRate, float spo2, float systolicBP, float diastolicBP) {
  if (heartRate > 0 && spo2 > 0) {  // Only publish valid data
    char msg[350]; // Increase buffer size for adding user_id
    snprintf(msg, sizeof(msg), "{\"user_id\": \"%s\", \"temperature\": %.2f, \"humidity\": %.2f, \"heart_rate\": %.2f, \"spo2\": %.2f, \"systolicBP\": %.2f, \"diastolicBP\": %.2f}", 
             user_id, temperature, humidity, heartRate, spo2, systolicBP, diastolicBP);
    Serial.print("Publishing message: ");
    Serial.println(msg);
    client.publish(mqtt_topic, msg);
  } else {
    Serial.println("Invalid data, skipping publish...");
  }
}

void setup() {
  // Start serial communication
  Serial.begin(9600);
  delay(1000);  // Ensure serial is ready

  // Setup WiFi and MQTT
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);

  // Initialize DHT sensor
  dht.begin();

  // Initialize MAX30105 sensor
  initializeSensor();
}

void loop() {
  // Ensure MQTT connection
  reconnect();
  client.loop();

  // Read data from DHT11
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Read heart rate and SpO2 in real-time
  readHeartRateAndSpO2();

  // Estimate Blood Pressure
  float systolicBP = 0;
  float diastolicBP = 0;
  estimateBloodPressure(heartRate, spo2, systolicBP, diastolicBP);

  // Print sensor values to serial monitor if valid
  if (hasValidData) {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.print(" C, Humidity: ");
    Serial.print(humidity);
    Serial.print("%, Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" BPM, SpO2: ");
    Serial.print(spo2);
    Serial.print(" %, Systolic BP: ");
    Serial.print(systolicBP);
    Serial.print(" mmHg, Diastolic BP: ");
    Serial.print(diastolicBP);
    Serial.println(" mmHg");
  } else {
    Serial.println("Skipping invalid readings.");
  }

  // Publish sensor data to MQTT broker
  publishSensorData(temperature, humidity, heartRate, spo2, systolicBP, diastolicBP);

  // Wait before next iteration
  delay(1000); // Real-time update every second
}
