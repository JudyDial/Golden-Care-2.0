from rest_framework import serializers
from .models import Appointment, SensorData, Alert
from userManager.models import Patient, Provider


class PatientSerializer(serializers.ModelSerializer):
    """
    Serializer for the Patient model.
    """
    class Meta:
        model = Patient
        fields = ['id', 'username', 'email', 'contact_number']


class ProviderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Provider model.
    """
    class Meta:
        model = Provider
        fields = ['id', 'Provider_name', 'email', 'contact_number']


class AppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Appointment model, including patient and provider details.
    """
    patient = PatientSerializer(read_only=True)
    provider = ProviderSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['appointment_id', 'patient', 'provider', 'appointment_date', 'status', 'reason_for_appointment', 'created_at', 'updated_at']


class SensorDataSerializer(serializers.ModelSerializer):
    """
    Serializer for the SensorData model, including patient details.
    """
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = SensorData
        fields = ['id', 'patient', 'temperature', 'humidity', 'heart_rate', 'spo2', 'systolic_bp', 'diastolic_bp', 'timestamp']


class AlertSerializer(serializers.ModelSerializer):
    """
    Serializer for the Alert model, including patient details.
    """
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Alert
        fields = ['alert_id', 'patient', 'alert_type', 'description', 'is_active', 'created_at', 'resolved_at']
