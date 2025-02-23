// api.tsx
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios';
import {
  BASE_URL,
  REFRESH_TOKEN,
  GET_SENSOR_DATA_URL,
  GET_SENSOR_DATA_BY_PATIENT_URL,
  GET_RECENT_SENSOR_DATA_URL,
  CREATE_SENSOR_DATA_URL,
  UPDATE_SENSOR_DATA_URL,
  DELETE_SENSOR_DATA_URL,
} from './apiConfig';

// Helper function for handling API errors
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
  async (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      } else {
        config.headers = {}; // provide a default value for headers
      }
    } catch (error) {
      console.error('Error retrieving access token:', error);
    }
    return config as InternalAxiosRequestConfig; // cast config to InternalAxiosRequestConfig
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Handle refresh token logic
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: (AxiosRequestConfig & { _retry?: boolean }) | undefined = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

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

// Handle token refresh logic (same as in your original api.tsx)

// API Functions for Sensor Data
export const getSensorData = async () => {
  try {
    const response = await api.get(GET_SENSOR_DATA_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getSensorDataByPatient = async (patientId: string) => {
  try {
    const response = await api.get(`${GET_SENSOR_DATA_BY_PATIENT_URL}${patientId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getRecentSensorData = async (patientId?: string) => {
  try {
    const params = patientId ? { patient_id: patientId } : {};
    const response = await api.get(GET_RECENT_SENSOR_DATA_URL, { params });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createSensorData = async (data: Record<string, unknown>) => {
  try {
    const response = await api.post(CREATE_SENSOR_DATA_URL, data);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateSensorData = async (id: string, data: Record<string, unknown>) => {
  try {
    const response = await api.patch(UPDATE_SENSOR_DATA_URL.replace('{id}', id), data);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteSensorData = async (id: string) => {
  try {
    const response = await api.delete(DELETE_SENSOR_DATA_URL.replace('{id}', id));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
