"use client"
import React, { createContext, useContext, useEffect, useState,ReactNode } from 'react';
import { getSensorData, getSensorDataByPatient, getRecentSensorData, createSensorData, updateSensorData, deleteSensorData } from '@/handler/api';

// Define the shape of the SensorData context
interface SensorDataContextType {
  sensorData: any[];
  recentSensorData: any[];
  loading: boolean;
  error: string | null;
  fetchSensorData: () => void;
  fetchRecentSensorData: (patientId?: string) => void;
  addSensorData: (data: any) => void;
  modifySensorData: (id: string, data: any) => void;
  removeSensorData: (id: string) => void;
}

// Create the SensorData context
const SensorDataContext = createContext<SensorDataContextType | undefined>(undefined);

// Create a provider component
interface SensorDataProviderProps {
    children: ReactNode;
  }
// Create the provider component
export const SensorDataProvider: React.FC<SensorDataProviderProps> = ({ children }) => {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [recentSensorData, setRecentSensorData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSensorData();
  }, []);

  // Fetch all sensor data
  const fetchSensorData = async () => {
    setLoading(true);
    try {
      const data = await getSensorData();
      setSensorData(data);
    } catch (err) {
      setError('Failed to fetch sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent sensor data (last 24 hours)
  const fetchRecentSensorData = async (patientId?: string) => {
    setLoading(true);
    try {
      const data = await getRecentSensorData(patientId);
      setRecentSensorData(data);
    } catch (err) {
      setError('Failed to fetch recent sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new sensor data
  const addSensorData = async (data: any) => {
    setLoading(true);
    try {
      await createSensorData(data);
      fetchSensorData(); // Refresh the list after adding
    } catch (err) {
      setError('Failed to add sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update existing sensor data
  const modifySensorData = async (id: string, data: any) => {
    setLoading(true);
    try {
      await updateSensorData(id, data);
      fetchSensorData(); // Refresh the list after update
    } catch (err) {
      setError('Failed to update sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove sensor data
  const removeSensorData = async (id: string) => {
    setLoading(true);
    try {
      await deleteSensorData(id);
      fetchSensorData(); // Refresh the list after deletion
    } catch (err) {
      setError('Failed to delete sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SensorDataContext.Provider
      value={{
        sensorData,
        recentSensorData,
        loading,
        error,
        fetchSensorData,
        fetchRecentSensorData,
        addSensorData,
        modifySensorData,
        removeSensorData,
      }}
    >
      {children}
    </SensorDataContext.Provider>
  );
};

// Custom hook to use the SensorData context
export const useSensorData = (): SensorDataContextType => {
  const context = useContext(SensorDataContext);
  if (!context) {
    throw new Error('useSensorData must be used within a SensorDataProvider');
  }
  return context;
};
