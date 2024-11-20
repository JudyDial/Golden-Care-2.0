// const BASE_URL = 'http://192.168.0.105:80';
// const BASE_URL = 'http://172.16.105.74:8001';
const BASE_URL = 'http://127.0.0.1:80';
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


// app Management
export const CREATE_APP_URL = `${BASE_URL}/api/user-apps/`;
export const GET_APP_URL = `${BASE_URL}/api/user-apps/{id}/`;
export const GET_APPS_URL = `${BASE_URL}/api/user-apps/`;
export const UPDATE_APP_URL = `${BASE_URL}/api/user-apps/{id}/`;

// Traffic Logs
export const GET_TRAFFIC_LOGS_URL = `${BASE_URL}/traffic_logs/`;
export const GET_TRAFFIC_LOGS_SUMMARY_URL = `${BASE_URL}/traffic_logs/summary/`;
export const RECENT_TRAFFIC_LOGS_URL = `${BASE_URL}/traffic_logs/recent_logs/`;

// Anomaly Logs
export const GET_ANOMALY_LOGS_URL = `${BASE_URL}/anomaly_logs/`;
export const GET_ANOMALY_LOGS_SUMMARY_URL = `${BASE_URL}/anomaly_logs/summary/`;
export const RECENT_ANOMALY_LOGS_URL = `${BASE_URL}/anomaly_logs/recent_anomalies/`;

// Model Retrain Trigger
export const RETRAIN_TRIGGER_URL = `${BASE_URL}/model_retrain_triggers/`;
export const RETRAIN_TRIGGER_SUMMARY_URL = `${BASE_URL}/model_retrain_triggers/summary/`;
export const TRIGGER_RETRAIN_URL = `${BASE_URL}/model_retrain_triggers/trigger_retrain/`;

export { BASE_URL }