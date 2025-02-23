import axios, { AxiosError, AxiosResponse, AxiosRequestConfig,InternalAxiosRequestConfig } from 'axios';
import { 
  BASE_URL,
  REFRESH_TOKEN,
  GET_APPOINTMENTS_URL, 
  GET_APPOINTMENT_URL, 
  CREATE_APPOINTMENT_URL, 
  UPDATE_APPOINTMENT_URL, 
  DELETE_APPOINTMENT_URL, 
  GET_UPCOMING_APPOINTMENTS_URL 
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

// Configure Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the access token in headers

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

// Get all appointments
export const getAppointments = async () => {
  try {
    const response = await api.get(GET_APPOINTMENTS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Get a specific appointment by ID
export const getAppointment = async (id: string) => {
  try {
    const url = GET_APPOINTMENT_URL.replace('{id}', id);
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Create a new appointment
interface AppointmentData {
  // Define the structure of appointmentData here
  // Example:
  title: string;
  date: string;
  // Add other fields as needed
}

export const createAppointment = async (appointmentData: AppointmentData) => {
  try {
    const response = await api.post(CREATE_APPOINTMENT_URL, appointmentData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Update an existing appointment
export const updateAppointment = async (id: string, appointmentData: AppointmentData) => {
  try {
    const url = UPDATE_APPOINTMENT_URL.replace('{id}', id);
    const response = await api.patch(url, appointmentData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Delete an appointment
export const deleteAppointment = async (id: string) => {
  try {
    const url = DELETE_APPOINTMENT_URL.replace('{id}', id);
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Get upcoming appointments for logged-in user
export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get(GET_UPCOMING_APPOINTMENTS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
