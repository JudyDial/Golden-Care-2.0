from rest_framework import serializers
from .models import SensorData, Appointment
from userManager.models import Patient


class PatientSerializer(serializers.ModelSerializer):
    """
    Serializer for the Patient model to include basic information about the patient.
    """
    class Meta:
        model = Patient
        fields = ['id', 'username', 'email', 'contact_number']


class SensorDataSerializer(serializers.ModelSerializer):
    """
    Serializer for the SensorData model that includes patient information.
    """
    patient = PatientSerializer(read_only=True)  # Serializes patient data as nested object

    class Meta:
        model = SensorData
        fields = ['id', 'patient', 'temperature', 'humidity', 'heart_rate', 'spo2',
                  'systolic_bp', 'diastolic_bp', 'timestamp']


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appointment model to include details of the patient, provider, and the appointment.
    """
    patient = PatientSerializer(read_only=True)  # Read-only as the patient is provided via context or view
    provider_name = serializers.CharField(source='provider.Provider_name', read_only=True)  # Read-only provider name

    class Meta:
        model = Appointment
        fields = ['appointment_id', 'patient', 'provider_name', 'appointment_date', 'status', 'reason_for_appointment',
                  'created_at', 'updated_at']
