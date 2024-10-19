from django.contrib import admin
from .models import Appointment, SensorData, Alert

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """
    Admin interface for managing Appointments between patients and providers.
    """
    list_display = ['appointment_id', 'patient', 'provider', 'appointment_date', 'status']
    list_filter = ['status', 'appointment_date', 'provider']
    search_fields = ['patient__username', 'provider__Provider_name']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-appointment_date']

    def provider(self, obj):
        return obj.provider.Provider_name


@admin.register(SensorData)
class SensorDataAdmin(admin.ModelAdmin):
    """
    Admin interface for managing SensorData from patients.
    """
    list_display = ['patient', 'temperature', 'heart_rate', 'spo2','systolic_bp','diastolic_bp', 'timestamp']
    list_filter = ['timestamp', 'patient']
    search_fields = ['patient__username']
    readonly_fields = ['timestamp']


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    """
    Admin interface for managing Alerts triggered from sensor data.
    """
    list_display = ['patient', 'alert_type', 'description', 'is_active', 'created_at', 'resolved_at']
    list_filter = ['alert_type', 'is_active', 'created_at']
    search_fields = ['patient__username']
    readonly_fields = ['created_at', 'resolved_at']
    actions = ['resolve_alerts']

    def resolve_alerts(self, request, queryset):
        for alert in queryset:
            alert.resolve_alert()
        self.message_user(request, f"{queryset.count()} alerts were resolved.")
    resolve_alerts.short_description = "Resolve selected alerts"
