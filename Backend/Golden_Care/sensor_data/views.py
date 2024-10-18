from rest_framework import viewsets
from .models import SensorData, Appointment
from .serializers import SensorDataSerializer, AppointmentSerializer
from userManager.models import Patient
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone


class SensorDataViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions for SensorData.
    """
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned sensor data to a given patient
        by filtering against a `patient_id` query parameter in the URL.
        """
        queryset = SensorData.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset

    @action(detail=False, methods=['get'])
    def recent_data(self, request):
        """
        Custom action to retrieve the most recent sensor data for all patients.
        """
        recent_data = SensorData.objects.filter(timestamp__gte=timezone.now() - timezone.timedelta(hours=24))
        serializer = self.get_serializer(recent_data, many=True)
        return Response(serializer.data)


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions for Appointment.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned appointments by patient or provider.
        """
        queryset = Appointment.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        provider_id = self.request.query_params.get('provider_id', None)

        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        if provider_id is not None:
            queryset = queryset.filter(provider__id=provider_id)
        
        return queryset

    @action(detail=False, methods=['get'])
    def upcoming_appointments(self, request):
        """
        Custom action to retrieve upcoming appointments.
        """
        upcoming_appointments = Appointment.objects.filter(appointment_date__gte=timezone.now())
        serializer = self.get_serializer(upcoming_appointments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Custom action to cancel an appointment.
        """
        appointment = self.get_object()
        appointment.cancel_appointment()
        return Response({'status': 'appointment canceled'})

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """
        Custom action to mark an appointment as completed.
        """
        appointment = self.get_object()
        appointment.complete_appointment()
        return Response({'status': 'appointment completed'})
