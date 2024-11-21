import { getIndividual, updateIndividual,loginUser,logoutUser,signUpUser,getUserDetails } from './UserManagement';
import { getAlerts, getAlert, createAlert, updateAlert, deleteAlert, getActiveAlerts, resolveAlert } from './alerts';
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment, getUpcomingAppointments } from './appointmentsApi';
import { getSensorData, getSensorDataByPatient, getRecentSensorData, createSensorData, updateSensorData, deleteSensorData } from './sensorData';
// user management 
export { 
  getIndividual,
  updateIndividual,
  loginUser,
  logoutUser,
  signUpUser,
  getUserDetails,
}

// alerts 
export {
  getAlerts,
  getAlert,
  createAlert,
  updateAlert,
  deleteAlert,
  getActiveAlerts,
  resolveAlert,
};

// appointments
export {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getUpcomingAppointments
};

// sensor data
export {
  getSensorData,
  getSensorDataByPatient,
  getRecentSensorData,
  createSensorData,
  updateSensorData,
  deleteSensorData
};