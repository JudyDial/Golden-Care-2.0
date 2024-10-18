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
        heart_rate (FloatField): Patient's heart rate data.
        spo2 (FloatField): Patient's blood oxygen level (SpO2).
        accel_x, accel_y, accel_z (FloatField): Accelerometer readings.
        gyro_x, gyro_y, gyro_z (FloatField): Gyroscope readings.
        timestamp (DateTimeField): Time when the data was received.
    """
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='sensor_data')
    temperature = models.FloatField(null=True, blank=True)
    heart_rate = models.FloatField(null=True, blank=True)
    spo2 = models.FloatField(null=True, blank=True)
    accel_x = models.FloatField(null=True, blank=True)
    accel_y = models.FloatField(null=True, blank=True)
    accel_z = models.FloatField(null=True, blank=True)
    gyro_x = models.FloatField(null=True, blank=True)
    gyro_y = models.FloatField(null=True, blank=True)
    gyro_z = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sensor Data for {self.patient} at {self.timestamp}"
