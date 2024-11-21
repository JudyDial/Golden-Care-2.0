"use client";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
  getAlerts,
  getAlert,
  createAlert,
  updateAlert,
  deleteAlert,
  getActiveAlerts,
  resolveAlert
} from '@/handler/api'; // Import API functions
import { useRouter } from 'next/navigation';

interface AlertContextData {
  alerts: any[];
  activeAlerts: any[];
  loading: boolean;
  fetchAlerts: () => Promise<void>;
  fetchActiveAlerts: () => Promise<void>;
  fetchAlert: (id: string) => Promise<void>;
  createAlert: (alertData: any) => Promise<void>;
  updateAlert: (id: string, alertData: any) => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
  resolveAlert: (id: string) => Promise<void>;
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextData>({
  alerts: [],
  activeAlerts: [],
  loading: false,
  fetchAlerts: async () => {},
  fetchActiveAlerts: async () => {},
  fetchAlert: async () => {},
  createAlert: async () => {},
  updateAlert: async () => {},
  deleteAlert: async () => {},
  resolveAlert: async () => {},
});

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch all alerts (for providers) or specific alerts (for patients)
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await getAlerts();
      setAlerts(response);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch active alerts
  const fetchActiveAlerts = async () => {
    try {
      setLoading(true);
      const response = await getActiveAlerts();
      setActiveAlerts(response);
    } catch (error) {
      console.error('Error fetching active alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single alert by ID
  const fetchAlert = async (id: string) => {
    try {
      setLoading(true);
      const response = await getAlert(id);
      return response;
    } catch (error) {
      console.error('Error fetching alert:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new alert
  const createAlert = async (alertData: any) => {
    try {
      setLoading(true);
      const response = await createAlert(alertData);
      setAlerts((prevAlerts) => [...prevAlerts, response]); // Add the new alert to the list
    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing alert
  const updateAlert = async (id: string, alertData: any) => {
    try {
      setLoading(true);
      const response:any  = await updateAlert(id, alertData);
        setAlerts((prevAlerts) =>
        prevAlerts.map((alert) => (alert.id === id ? { ...alert, ...response } : alert))
      ); // Update the alert in the list
    } catch (error) {
      console.error('Error updating alert:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an alert by ID
  const deleteAlert = async (id: string) => {
    try {
      setLoading(true);
      await deleteAlert(id);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id)); // Remove alert from the list
    } catch (error) {
      console.error('Error deleting alert:', error);
    } finally {
      setLoading(false);
    }
  };

  // Resolve an alert by ID
  const resolveAlert = async (id: string) => {
    try {
      setLoading(true);
      const response = await resolveAlert(id);
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === id ? { ...alert, is_active: false, status: 'resolved' } : alert
        )
      ); // Mark the alert as resolved in the list
    } catch (error) {
      console.error('Error resolving alert:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    fetchActiveAlerts();
  }, []); // Fetch alerts when the context is initialized

  return (
    <AlertContext.Provider
      value={{
        alerts,
        activeAlerts,
        loading,
        fetchAlerts,
        fetchActiveAlerts,
        fetchAlert,
        createAlert,
        updateAlert,
        deleteAlert,
        resolveAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
