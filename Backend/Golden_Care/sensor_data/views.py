from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Appointment, SensorData, Alert
from .serializers import AppointmentSerializer, SensorDataSerializer, AlertSerializer
from userManager.models import Patient, Provider
from rest_framework.exceptions import ValidationError

class IsProviderOrPatient(permissions.BasePermission):
    """
    Custom permission to allow access only to Providers (Doctors) or Patients.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.user_type in ['provider', 'patient'])


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Appointment instances.
    - Providers (Doctors) can view and manage all appointments.
    - Patients can only view their own appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsProviderOrPatient]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'provider':
            return Appointment.objects.filter(provider=user)
        elif user.user_type == 'patient':
            return Appointment.objects.filter(patient=user)
        return Appointment.objects.none()

    def perform_create(self, serializer):
        # Only Providers can create appointments
        user = self.request.user
        if user.user_type == 'provider':
            provider = Provider.objects.get(id=user.id)
            serializer.save(provider=provider)
        else:
            raise PermissionError("Only providers can create appointments.")

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def upcoming_appointments(self, request):
        """
        Custom action to retrieve upcoming appointments for the logged-in user.
        """
        user = request.user
        if user.user_type == 'provider':
            appointments = Appointment.objects.filter(provider=user, appointment_date__gte=timezone.now())
        elif user.user_type == 'patient':
            appointments = Appointment.objects.filter(patient=user, appointment_date__gte=timezone.now())
        else:
            appointments = []
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)


class SensorDataViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing SensorData instances.
    - Providers (Doctors) can view all sensor data or specific patient's data by passing patient_id.
    - Patients can only view their own sensor data.
    """
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer
    permission_classes = [IsProviderOrPatient]

    def get_queryset(self):
        """
        Custom queryset logic:
        - Providers can view all sensor data or filter by patient_id.
        - Patients can only view their own sensor data.
        """
        user = self.request.user
        if user.user_type == 'provider':
            # Allow filtering by patient_id for providers
            patient_id = self.request.query_params.get('patient_id')
            if patient_id:
                return SensorData.objects.filter(patient__id=patient_id)
            return SensorData.objects.all()  # Return all data if no patient_id is specified
        elif user.user_type == 'patient':
            return SensorData.objects.filter(patient=user)  # Return only the patient's own data
        return SensorData.objects.none()

    @action(detail=False, methods=['get'])
    def recent_data(self, request):
        """
        Custom action to retrieve the most recent sensor data within the last 24 hours.
        Providers can filter by patient_id, and patients will see only their own data.
        """
        user = self.request.user
        recent_time = timezone.now() - timezone.timedelta(hours=24)
        
        if user.user_type == 'provider':
            # Allow filtering by patient_id for providers
            patient_id = request.query_params.get('patient_id')
            if patient_id:
                recent_data = SensorData.objects.filter(patient__id=patient_id, timestamp__gte=recent_time)
            else:
                recent_data = SensorData.objects.filter(timestamp__gte=recent_time)
        elif user.user_type == 'patient':
            recent_data = SensorData.objects.filter(patient=user, timestamp__gte=recent_time)
        else:
            recent_data = SensorData.objects.none()

        serializer = self.get_serializer(recent_data, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """
        Perform create for sensor data.
        - Providers can pass the patient_id to create data for a specific patient.
        - Patients can only create their own data.
        """
        user = self.request.user
        patient_id = self.request.data.get('patient_id')

        if user.user_type == 'provider':
            # If a provider, they must pass a valid patient_id
            if not patient_id:
                raise ValidationError({"detail": "Patient ID is required for providers to create sensor data."})

            # Fetch the patient object based on the patient_id
            try:
                patient = Patient.objects.get(id=patient_id)
            except Patient.DoesNotExist:
                raise ValidationError({"detail": f"Patient with ID {patient_id} does not exist."})

            # Save the sensor data for the specific patient
            serializer.save(patient=patient)

        elif user.user_type == 'patient':
            # Patients can only create their own sensor data
            serializer.save(patient=user)


class AlertViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Alert instances.
    - Providers can view and manage all alerts.
    - Patients can view their own alerts.
    """
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsProviderOrPatient]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'provider':
            return Alert.objects.all()  # Providers can view all alerts
        elif user.user_type == 'patient':
            return Alert.objects.filter(patient=user)
        return Alert.objects.none()

    @action(detail=False, methods=['get'])
    def active_alerts(self, request):
        """
        Custom action to retrieve all active alerts.
        """
        active_alerts = Alert.objects.filter(is_active=True)
        serializer = self.get_serializer(active_alerts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def resolve_alert(self, request, pk=None):
        """
        Custom action to resolve an alert.
        Only Providers can resolve alerts.
        """
        alert = self.get_object()
        user = request.user

        if user.user_type == 'provider':
            alert.resolve_alert()
            return Response({'status': 'Alert resolved'})
        else:
            return Response({'detail': 'Only providers can resolve alerts'}, status=403)
