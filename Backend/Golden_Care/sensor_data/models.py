from django.db import models
from django.utils import timezone
from userManager.models import Patient, Provider
import uuid

class Appointment(models.Model):
    """
    Model for managing appointments between patients and providers.

    Attributes:
        appointment_id (UUIDField): A unique identifier for each appointment.
        patient (ForeignKey): The patient who has the appointment.
        provider (ForeignKey): The healthcare provider who will attend the appointment.
        appointment_date (DateTimeField): The scheduled date and time of the appointment.
        created_at (DateTimeField): Timestamp when the appointment was created.
        status (CharField): The current status of the appointment (scheduled, completed, canceled, etc.).
        reason_for_appointment (TextField): The reason or purpose for the appointment.
        updated_at (DateTimeField): Timestamp when the appointment was last updated.
    """
    APPOINTMENT_STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
        ('no_show', 'No Show'),
    ]

    appointment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=APPOINTMENT_STATUS_CHOICES, default='scheduled')
    reason_for_appointment = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-appointment_date']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"

    def __str__(self):
        return f"Appointment {self.appointment_id} for {self.patient.username} with {self.provider.Provider_name} on {self.appointment_date}"

    def is_upcoming(self):
        """
        Check if the appointment is in the future.
        """
        return self.appointment_date > timezone.now()

    def cancel_appointment(self):
        """
        Cancel the appointment and update its status.
        """
        self.status = 'canceled'
        self.save()

    def complete_appointment(self):
        """
        Mark the appointment as completed.
        """
        self.status = 'completed'
        self.save()


class SensorData(models.Model):
    """
    Model to store sensor data received from patients.
    Attributes:
        patient (ForeignKey): Reference to the Patient model.
        temperature (FloatField): Patient's temperature data.
        humidity (FloatField): Patient's humidity data.
        heart_rate (FloatField): Patient's heart rate data.
        spo2 (FloatField): Patient's blood oxygen level (SpO2).
        systolic_bp (FloatField): Estimated systolic blood pressure.
        diastolic_bp (FloatField): Estimated diastolic blood pressure.
        timestamp (DateTimeField): Time when the data was received.
    """
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sensor_data')
    temperature = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)  # Added humidity data
    heart_rate = models.FloatField(null=True, blank=True)
    spo2 = models.FloatField(null=True, blank=True)
    systolic_bp = models.FloatField(null=True, blank=True)  # Added systolic BP
    diastolic_bp = models.FloatField(null=True, blank=True)  # Added diastolic BP
    timestamp = models.DateTimeField(default=timezone.now)  # Timestamp of data

    def __str__(self):
        return f"Sensor Data for {self.patient.username} at {self.timestamp}"


class Alert(models.Model):
    """
    Model to store alerts/notifications generated for a patient's health status.

    Attributes:
        alert_id (UUIDField): A unique identifier for each alert.
        patient (ForeignKey): Reference to the Patient model.
        alert_type (CharField): Type of the alert (e.g., high temperature, low SpO2, etc.).
        description (TextField): Description of the alert, detailing the health issue.
        is_active (BooleanField): Indicates if the alert is currently active.
        created_at (DateTimeField): Timestamp when the alert was created.
        resolved_at (DateTimeField): Timestamp when the alert was resolved, null if still active.
    """
    ALERT_TYPE_CHOICES = [
        ('high_temp', 'High Temperature'),
        ('low_spo2', 'Low SpO2'),
        ('high_heart_rate', 'High Heart Rate'),
        ('low_heart_rate', 'Low Heart Rate'),
        # Add other alert types as needed
    ]

    alert_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='alerts')
    alert_type = models.CharField(max_length=50, choices=ALERT_TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)  # When the alert is resolved

    class Meta:
        verbose_name = "Alert"
        verbose_name_plural = "Alerts"
        unique_together = ('patient', 'alert_type', 'is_active')  # Ensure no duplicate active alerts for the same patient

    def __str__(self):
        return f"Alert {self.alert_type} for {self.patient.username}"

    def resolve_alert(self):
        """
        Mark the alert as resolved and deactivate it.
        """
        self.is_active = False
        self.resolved_at = timezone.now()
        self.save()
