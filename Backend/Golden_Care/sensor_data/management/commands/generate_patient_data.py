from datetime import timedelta,datetime
from django.utils import timezone
from django.core.management.base import BaseCommand
from userManager.models import Patient, Provider
from sensor_data.models import SensorData, Appointment, Alert
import random

def generate_random_sensor_data():
    """
    Generates random sensor data for a patient.
    """
    return {
        'temperature': round(random.uniform(36.0, 38.5), 2),  # Random temperature between 36.0 and 38.5
        'humidity': round(random.uniform(30.0, 80.0), 2),  # Random humidity between 30% and 80%
        'heart_rate': round(random.uniform(60.0, 100.0), 2),  # Random heart rate between 60 and 100 bpm
        'spo2': round(random.uniform(90.0, 100.0), 2),  # Random SpO2 between 90% and 100%
        'systolic_bp': round(random.uniform(100.0, 140.0), 2),  # Random systolic BP
        'diastolic_bp': round(random.uniform(60.0, 90.0), 2),  # Random diastolic BP
    }

def generate_sensor_data_for_patient(patient, start_date, num_minutes=10080):
    """
    Generates sensor data for a patient for a given number of minutes.
    """
    for i in range(num_minutes):
        timestamp = start_date + timedelta(minutes=i)  # Generate a timestamp for each minute
        sensor_data = generate_random_sensor_data()
        # Create SensorData instance
        SensorData.objects.create(
            patient=patient,
            temperature=sensor_data['temperature'],
            humidity=sensor_data['humidity'],
            heart_rate=sensor_data['heart_rate'],
            spo2=sensor_data['spo2'],
            systolic_bp=sensor_data['systolic_bp'],
            diastolic_bp=sensor_data['diastolic_bp'],
            timestamp=timestamp
        )
        print(f"Generated sensor data for {patient.username} on {timestamp}")

def generate_alerts_for_patient(patient):
    """
    Generates sample alerts based on random conditions for a patient's health status.
    """
    alert_types = [
        ('high_temp', 'High Temperature'),
        ('low_spo2', 'Low SpO2'),
        ('high_heart_rate', 'High Heart Rate'),
        ('low_heart_rate', 'Low Heart Rate'),
    ]
    
    for alert_type, alert_description in alert_types:
        # Create an alert
        Alert.objects.create(
            patient=patient,
            alert_type=alert_type,
            description=f"{alert_description} alert for {patient.username}",
            is_active=True
        )
        print(f"Created alert for {patient.username}: {alert_description}")

def generate_appointments_for_patient(patient, num_appointments=3):
    """
    Generates sample appointments for a patient with random dates and a provider.
    """
    providers = Provider.objects.all()
    if not providers:
        print("No providers found. Please create providers first.")
        return

    for _ in range(num_appointments):
        provider = random.choice(providers)
        appointment_date = timezone.now() + timedelta(days=random.randint(1, 30))  # Random future date for appointment
        Appointment.objects.create(
            patient=patient,
            provider=provider,
            appointment_date=appointment_date,
            reason_for_appointment="Routine checkup",
            status="scheduled"
        )
        print(f"Created appointment for {patient.username} with {provider.Provider_name} on {appointment_date}")

class Command(BaseCommand):
    help = 'Generates patient data, including sensor data, alerts, and appointments'

    def handle(self, *args, **kwargs):
        self.generate_data_for_specific_patients()

    def generate_data_for_specific_patients(self):
        """
        Generate data for the three specific patients: John Doe, Jane Smith, and Robert Johnson.
        """
        # Creating patients manually (or you can fetch them from the database if they already exist)
        patients_data = {
            "John Doe": {"username": "JohnDoe", "first_name": "John", "last_name": "Doe"},
            "Jane Smith": {"username": "JaneSmith", "first_name": "Jane", "last_name": "Smith"},
            "Robert Johnson": {"username": "RobertJohnson", "first_name": "Robert", "last_name": "Johnson"}
        }

        # Ensure these patients exist in the database
        patients = []
        for name, data in patients_data.items():
            patient, created = Patient.objects.get_or_create(
                username=data["username"], 
            )
            patients.append(patient)

        # Set the start date to 14th November 2024
        start_date = timezone.make_aware(datetime(2024, 11, 14, 0, 0, 0))

        # Generate data for each patient
        for patient in patients:
            self.stdout.write(f"Generating data for patient: {patient.username}")
            generate_sensor_data_for_patient(patient, start_date)
            generate_alerts_for_patient(patient)
            generate_appointments_for_patient(patient)

        self.stdout.write("Data generation complete.")
