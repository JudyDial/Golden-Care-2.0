import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  BASE_URL,
  REFRESH_TOKEN,
  GET_ALERTS_URL,
  GET_ALERT_URL,
  CREATE_ALERT_URL,
  UPDATE_ALERT_URL,
  DELETE_ALERT_URL,
  GET_ACTIVE_ALERTS_URL,
  RESOLVE_ALERT_URL,
} from './apiConfig';

// Handler for API error
const handleApiError = (error: AxiosError) => {
  if (error.response && error.response.data) {
    console.error('API Error:', error.response.data);
    throw error.response.data;
  } else {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Configure Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await localStorage.getItem('accessToken');

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Handle refresh token logic
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (originalRequest && error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await localStorage.getItem('refreshToken');

        if (refreshToken) {
          const response = await api.post(REFRESH_TOKEN, { refresh: refreshToken });

          if (response.status === 200) {
            await localStorage.setItem('accessToken', response.data.access);
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            }
            return api(originalRequest);
          } else {
            await localStorage.removeItem('accessToken');
            await localStorage.removeItem('refreshToken');
          }
        }

        await localStorage.removeItem('accessToken');
        await localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        await localStorage.removeItem('accessToken');
        await localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Alert Management Handlers

// Get all alerts (for providers) or patient-specific alerts
export const getAlerts = async () => {
  try {
    const response = await api.get(GET_ALERTS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Get details of a specific alert by ID
export const getAlert = async (id: string) => {
  try {
    const response = await api.get(GET_ALERT_URL.replace('{id}', id));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Create a new alert
export const createAlert = async (alertData: any) => {
  try {
    const response = await api.post(CREATE_ALERT_URL, alertData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Update a specific alert by ID
export const updateAlert = async (id: string, alertData: any) => {
  try {
    const response = await api.patch(UPDATE_ALERT_URL.replace('{id}', id), alertData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Delete a specific alert by ID
export const deleteAlert = async (id: string) => {
  try {
    const response = await api.delete(DELETE_ALERT_URL.replace('{id}', id));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Get all active alerts
export const getActiveAlerts = async () => {
  try {
    const response = await api.get(GET_ACTIVE_ALERTS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Resolve a specific alert by ID
export const resolveAlert = async (id: string) => {
  try {
    const response = await api.post(RESOLVE_ALERT_URL.replace('{id}', id));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
