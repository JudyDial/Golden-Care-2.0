import axios, { AxiosError, AxiosResponse } from 'axios';
import { 
  BASE_URL,
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
export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await api.post(CREATE_APPOINTMENT_URL, appointmentData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Update an existing appointment
export const updateAppointment = async (id: string, appointmentData: any) => {
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
