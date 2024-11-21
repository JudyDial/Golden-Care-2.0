const BASE_URL = 'http://192.168.0.105:80';
// const BASE_URL = 'http://172.16.105.74:8001';
// const BASE_URL = 'http://127.0.0.1:80';
// const BASE_URL = 'http://127.0.0.1:8000';

// Individual
export const GET_INDIVIDUAL_URL = `${BASE_URL}/Patients/pk`;
export const UPDATE_INDIVIDUAL_URL = `${BASE_URL}/Patients/pk/`;
// Admin
export const GET_ADMIN_URL = `${BASE_URL}/Patients/pk`;
export const UPDATE_ADMIN_URL = `${BASE_URL}/Patients/pk/`;
export const GET_PATIENTS_URL = `${BASE_URL}/users/?role=patients`;
export const GET_ADMINS_URL = `${BASE_URL}/users/?role=admins`;
export const GET_USERS_URL = `${BASE_URL}/users/?role=all`;

// General
export const SIGN_UP_URL = `${BASE_URL}/register/`;
export const REFRESH_TOKEN = `${BASE_URL}/token/refresh/`;
export const LOGIN_URL_URL = `${BASE_URL}/login/`;
export const LOGOUT_URL = `${BASE_URL}/logout/`;
export const GET_USER_URL = `${BASE_URL}/users/`;

// alert Mangement
export const GET_ALERTS_URL = `${BASE_URL}/alerts/`;
export const GET_ALERT_URL = `${BASE_URL}/alerts/{id}/`;
export const CREATE_ALERT_URL = `${BASE_URL}/alerts/`;
export const UPDATE_ALERT_URL = `${BASE_URL}/alerts/{id}/`;
export const DELETE_ALERT_URL = `${BASE_URL}/alerts/{id}/`;
export const GET_ACTIVE_ALERTS_URL = `${BASE_URL}/alerts/active_alerts/`;
export const RESOLVE_ALERT_URL = `${BASE_URL}/alerts/{id}/resolve_alert/`;

// Appointment-related URLs
export const GET_APPOINTMENTS_URL = `${BASE_URL}/appointments/`;
export const GET_APPOINTMENT_URL = `${BASE_URL}/appointments/{id}/`;
export const CREATE_APPOINTMENT_URL = `${BASE_URL}/appointments/`;
export const UPDATE_APPOINTMENT_URL = `${BASE_URL}/appointments/{id}/`;
export const DELETE_APPOINTMENT_URL = `${BASE_URL}/appointments/{id}/`;
export const GET_UPCOMING_APPOINTMENTS_URL = `${BASE_URL}/appointments/upcoming_appointments/`;

// Sensor Data Endpoints
export const GET_SENSOR_DATA_URL = `${BASE_URL}/sensordata/`;
export const GET_SENSOR_DATA_BY_PATIENT_URL = `${BASE_URL}/sensordata/?patient_id=`;
export const GET_RECENT_SENSOR_DATA_URL = `${BASE_URL}/sensordata/recent_data/`;
export const CREATE_SENSOR_DATA_URL = `${BASE_URL}/sensordata/`;
export const UPDATE_SENSOR_DATA_URL = `${BASE_URL}/sensordata/{id}/`;
export const DELETE_SENSOR_DATA_URL = `${BASE_URL}/sensordata/{id}/`;

export { BASE_URL }