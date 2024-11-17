import axios ,{AxiosError,AxiosResponse} from 'axios';
import { 
  BASE_URL, 
  GET_INDIVIDUAL_URL,
  UPDATE_INDIVIDUAL_URL,
  REFRESH_TOKEN,
  SIGN_UP_URL, 
  LOGIN_URL_URL, 
  LOGOUT_URL,
  GET_USER_URL,

  // User app management
  GET_APP_URL, 
  GET_APPS_URL, 
  CREATE_APP_URL, 
  UPDATE_APP_URL,

  // Detection app
  GET_TRAFFIC_LOGS_URL, 
  GET_TRAFFIC_LOGS_SUMMARY_URL,
  RECENT_TRAFFIC_LOGS_URL,
  GET_ANOMALY_LOGS_URL, 
  GET_ANOMALY_LOGS_SUMMARY_URL,
  RECENT_ANOMALY_LOGS_URL, 
  RETRAIN_TRIGGER_URL, 
  RETRAIN_TRIGGER_SUMMARY_URL,
  TRIGGER_RETRAIN_URL,
  
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

// User Authentication Handlers
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_URL_URL, { email, password });
    const { access, refresh, user } = response.data;
    await localStorage.setItem('accessToken', access);
    await localStorage.setItem('refreshToken', refresh);
    await localStorage.setItem('username', user.username);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const signUpUser = async (email: string, password1: string, password2: string, user_type: string) => {
  try {
    const response = await axios.post(SIGN_UP_URL, { email, password1, password2, user_type });
    const { access, refresh, user } = response.data;
    await localStorage.setItem('accessToken', access);
    await localStorage.setItem('refreshToken', refresh);
    await localStorage.setItem('username', user.username);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(GET_USER_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getIndividual = async () => {
  try {
    const response = await api.get(GET_INDIVIDUAL_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const updateIndividual = async (formData: any) => {
  try {
    const response = await api.patch(UPDATE_INDIVIDUAL_URL, formData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const logoutUser = async () => {
  try {
    const authToken = await localStorage.getItem('accessToken');
    if (!authToken) throw new Error('No auth token found');
    const response = await api.post(LOGOUT_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  } finally {
    await localStorage.removeItem('accessToken');
    await localStorage.removeItem('refreshToken');
  }
};


// User app management
// CREATE user app
export const createUserApp = async (appData:any) => {
  try {
    const response = await api.post(CREATE_APP_URL, appData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// GET a single user app by ID
export const getUserApp = async (id:string) => {
  try {
    const response = await api.get(GET_APP_URL.replace('{id}', id));
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// GET all user apps
export const getUserApps = async () => {
  try {
    const response = await api.get(GET_APPS_URL);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// UPDATE user app
export const updateUserApp = async (id:string, appData:any) => {
  try {
    const response = await api.patch(UPDATE_APP_URL.replace('{id}', id), appData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Traffic Logs

export const getTrafficLogs = async (appId: string) => {
  try {
    const response = await api.get(`${GET_TRAFFIC_LOGS_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getSummaryTrafficLogs = async (appId: string) => {
  try {
    const response = await api.get(`${GET_TRAFFIC_LOGS_SUMMARY_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const getRecentTrafficLogs = async (appId: string) => {
  try {
    const response = await api.get(`${RECENT_TRAFFIC_LOGS_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Anomaly Logs

export const getAnomalyLogs = async (appId: string) => {
  try {
    const response = await api.get(`${GET_ANOMALY_LOGS_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
export const getSummaryAnomalyLogs = async (appId: string) => {
  try {
    const response = await api.get(`${GET_ANOMALY_LOGS_SUMMARY_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getRecentAnomalyLogs = async (appId: string) => {
  try {
    const response = await api.get(`${RECENT_ANOMALY_LOGS_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

// Model Retrain Trigger

export const getRetrainTriggers = async (appId: string) => {
  try {
    const response = await api.get(`${RETRAIN_TRIGGER_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const getRetrainTriggerSummary = async (appId: string) => {
  try {
    const response = await api.get(`${RETRAIN_TRIGGER_SUMMARY_URL}?app_id=${appId}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const triggerRetrainModel = async (appId: string) => {
  try {
    const response = await api.post(TRIGGER_RETRAIN_URL, { app_id: appId });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};