from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Appointment, SensorData, Alert
from .serializers import AppointmentSerializer, SensorDataSerializer, AlertSerializer
from userManager.models import Patient, Provider
from rest_framework.exceptions import ValidationError
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json
import pickle
import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler


# Permissions
class IsProviderOrPatient(permissions.BasePermission):
    """
    Custom permission to allow access only to Providers (Doctors) or Patients.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.user_type in ['provider', 'patient'])


# AppointmentViewSet
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
        user = self.request.user
        if user.user_type == 'provider':
            provider = Provider.objects.get(id=user.id)
            serializer.save(provider=provider)
        else:
            raise PermissionError("Only providers can create appointments.")

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def upcoming_appointments(self, request):
        """
        Retrieve upcoming appointments for the logged-in user.
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


# SensorDataViewSet
class SensorDataViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing SensorData instances.
    - Providers can view all sensor data or specific patient's data by passing patient_id.
    - Patients can only view their own sensor data.
    """
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer
    permission_classes = [IsProviderOrPatient]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'provider':
            patient_id = self.request.query_params.get('patient_id')
            if patient_id:
                return SensorData.objects.filter(patient__id=patient_id)
            return SensorData.objects.all()
        elif user.user_type == 'patient':
            return SensorData.objects.filter(patient=user)
        return SensorData.objects.none()

    @action(detail=False, methods=['get'])
    def recent_data(self, request):
        """
        Retrieve recent sensor data within the last 24 hours.
        Providers can filter by patient_id, patients see their own data.
        """
        user = self.request.user
        recent_time = timezone.now() - timezone.timedelta(hours=24)
        
        if user.user_type == 'provider':
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
        user = self.request.user
        patient_id = self.request.data.get('patient_id')

        if user.user_type == 'provider':
            if not patient_id:
                raise ValidationError({"detail": "Patient ID is required for providers to create sensor data."})

            try:
                patient = Patient.objects.get(id=patient_id)
            except Patient.DoesNotExist:
                raise ValidationError({"detail": f"Patient with ID {patient_id} does not exist."})

            serializer.save(patient=patient)

        elif user.user_type == 'patient':
            patient = Patient.objects.get(id=user.id)
            serializer.save(patient=patient)


# AlertViewSet
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
            return Alert.objects.all()
        elif user.user_type == 'patient':
            return Alert.objects.filter(patient=user)
        return Alert.objects.none()

    @action(detail=False, methods=['get'])
    def active_alerts(self, request):
        """
        Retrieve all active alerts.
        """
        active_alerts = Alert.objects.filter(is_active=True)
        serializer = self.get_serializer(active_alerts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def resolve_alert(self, request, pk=None):
        """
        Resolve an alert.
        Only Providers can resolve alerts.
        """
        alert = self.get_object()
        user = request.user

        if user.user_type == 'provider':
            alert.resolve_alert()
            return Response({'status': 'Alert resolved'})
        else:
            return Response({'detail': 'Only providers can resolve alerts'}, status=403)


# Prediction Views for Diabetes and Hypertension
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load Diabetes Model and Encoders
with open(os.path.join(BASE_DIR, 'model/Diabetes_model.pkl'), 'rb') as file:
    diabetes_model = pickle.load(file)

with open(os.path.join(BASE_DIR, 'model/gender_encoder.pkl'), 'rb') as f:
    gender_encoder = pickle.load(f)

with open(os.path.join(BASE_DIR, 'model/hypertension_encoder.pkl'), 'rb') as f:
    hypertension_encoder = pickle.load(f)

with open(os.path.join(BASE_DIR, 'model/heart_disease_encoder.pkl'), 'rb') as f:
    heart_disease_encoder = pickle.load(f)

with open(os.path.join(BASE_DIR, 'model/smoking_history_encoder.pkl'), 'rb') as f:
    smoking_history_encoder = pickle.load(f)
with open(os.path.join(BASE_DIR, 'model/diabetes_encoder.pkl'), 'rb') as f:
    diabetes_encoder = pickle.load(f)

@method_decorator(csrf_exempt, name='dispatch')
class DiabetesPredictionView(View):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)

            # Transform categorical data
            gender = gender_encoder.transform([body['gender']])[0]
            hypertension = hypertension_encoder.transform([body['hypertension']])[0]
            heart_disease = heart_disease_encoder.transform([body['heart_disease']])[0]
            smoking_history = smoking_history_encoder.transform([body['smoking_history']])[0]

            # Parse and scale numerical data
            age = int(body['age'])
            bmi = float(body['bmi'])
            HbA1c_level = float(body['HbA1c_level'])
            blood_glucose_level = float(body['blood_glucose_level'])

            data = pd.DataFrame({
                'gender': [gender],
                'age': [age],
                'Hypertension': [hypertension],
                'heart_disease': [heart_disease],
                'smoking_history': [smoking_history],
                'bmi': [bmi],
                'HbA1c_level': [HbA1c_level],
                'blood_glucose_level': [blood_glucose_level]
            })

            scaler = StandardScaler()
            data[['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']] = scaler.fit_transform(
                data[['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']]
            )

            prediction = diabetes_model.predict(data)
            result = "You are at risk of diabetes and should consult a doctor" if prediction[0] == 1 else "You are not at risk of diabetes"
            return JsonResponse({'prediction': int(prediction[0]), 'message': result})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


# Load Hypertension Model and Encoders
with open(os.path.join(BASE_DIR, 'model/hypertension_model.pkl'), 'rb') as file:
    hypertension_model = pickle.load(file)


@method_decorator(csrf_exempt, name='dispatch')
class HypertensionPredictionView(View):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)

            # Get and transform categorical fields
            gender = body['gender']
            diabetes = body['diabetes']
            heart_disease = body['heart_disease']
            smoking_history = body['smoking_history']

            # Use encoders to transform categorical fields
            gender_encoded = gender_encoder.transform([gender])[0]
            diabetes_encoded = diabetes_encoder.transform([diabetes])[0]
            heart_disease_encoded = heart_disease_encoder.transform([heart_disease])[0]
            smoking_history_encoded = smoking_history_encoder.transform([smoking_history])[0]

            # Parse and validate numerical fields
            age = int(body['age'])
            bmi = float(body['bmi'])
            HbA1c_level = float(body['HbA1c_level'])
            blood_glucose_level = float(body['blood_glucose_level'])

            # Prepare input data as a DataFrame
            data = pd.DataFrame({
                'gender': [gender_encoded],
                'age': [age],
                'diabetes': [diabetes_encoded],
                'heart_disease': [heart_disease_encoded],
                'smoking_history': [smoking_history_encoded],
                'bmi': [bmi],
                'HbA1c_level': [HbA1c_level],
                'blood_glucose_level': [blood_glucose_level]
            })

            # Scale the input features for numeric columns
            features_to_scale = ['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']
            scaler = StandardScaler()
            data[features_to_scale] = scaler.fit_transform(data[features_to_scale])

            # Perform the prediction using the loaded hypertension model
            prediction = hypertension_model.predict(data)
            result = "You are at risk of Hypertension and should consult a doctor" if prediction[0] == 1 else "You are not at risk of Hypertension"

            # Return the prediction result in JSON format
            return JsonResponse({
                'prediction': int(prediction[0]),
                'message': result
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
