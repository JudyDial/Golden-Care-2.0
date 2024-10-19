from django.contrib import admin
from .models import SensorData, Appointment

@admin.register(SensorData)
class SensorDataAdmin(admin.ModelAdmin):
    """
    Admin panel configuration for managing SensorData.
    """
    list_display = ['patient', 'temperature', 'heart_rate', 'spo2', 'timestamp']
    list_filter = ['patient', 'timestamp']
    search_fields = ['patient__username', 'patient__email']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """
    Admin panel configuration for managing Appointments.
    """
    list_display = ['appointment_id', 'patient', 'provider', 'appointment_date', 'status']
    list_filter = ['provider', 'status', 'appointment_date']
    search_fields = ['patient__username', 'provider__Provider_name', 'reason_for_appointment']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-appointment_date']

    def provider(self, obj):
        """
        Display the provider name in the admin panel.
        """
        return obj.provider.Provider_name


# Register other related models
# admin.site.register(Patient)
# admin.site.register(Provider)
