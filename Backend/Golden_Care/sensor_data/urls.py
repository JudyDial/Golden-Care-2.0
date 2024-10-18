from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SensorDataViewSet, AppointmentViewSet

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'sensordata', SensorDataViewSet, basename='sensordata')
router.register(r'appointments', AppointmentViewSet, basename='appointments')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
