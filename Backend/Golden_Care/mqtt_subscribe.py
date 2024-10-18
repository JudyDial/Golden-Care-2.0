import json
import paho.mqtt.client as mqtt
from django.core.management.base import BaseCommand
from sensor_data.models import SensorData
from userManager.models import Patient

MQTT_BROKER = 'YOUR_MQTT_BROKER_IP'
MQTT_PORT = 1883
MQTT_TOPIC = 'sensor/data'

class Command(BaseCommand):
    help = 'Subscribe to the MQTT topic and store sensor data in the database'

    def handle(self, *args, **kwargs):
        client = mqtt.Client()
        client.on_connect = self.on_connect
        client.on_message = self.on_message

        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_forever()

    def on_connect(self, client, userdata, flags, rc):
        print(f"Connected to MQTT Broker with result code {rc}")
        client.subscribe(MQTT_TOPIC)

    def on_message(self, client, userdata, msg):
        print(f"Received message on {msg.topic}: {msg.payload.decode()}")
        data = json.loads(msg.payload.decode())

        # Extract user_id and sensor data from the received payload
        user_id = data.get('user_id')  # Expecting the user ID to be sent from the ESP32
        temperature = data.get('temperature')
        heart_rate = data.get('heart_rate')
        spo2 = data.get('spo2')
        accel_x = data.get('accel_x')
        accel_y = data.get('accel_y')
        accel_z = data.get('accel_z')
        gyro_x = data.get('gyro_x')
        gyro_y = data.get('gyro_y')
        gyro_z = data.get('gyro_z')

        try:
            # Find the patient by user ID
            patient = Patient.objects.get(id=user_id)
            # Save the sensor data in the database
            SensorData.objects.create(
                patient=patient,
                temperature=temperature,
                heart_rate=heart_rate,
                spo2=spo2,
                accel_x=accel_x,
                accel_y=accel_y,
                accel_z=accel_z,
                gyro_x=gyro_x,
                gyro_y=gyro_y,
                gyro_z=gyro_z
            )
            print(f"Sensor data saved for patient {patient.username}")
        except Patient.DoesNotExist:
            print(f"Patient with ID {user_id} does not exist")
