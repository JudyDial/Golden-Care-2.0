"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment, getUpcomingAppointments } from '@/handler/api';

// Define Types for the Context
interface Appointment {
  id: string;
  provider: string;
  patient: string;
  appointment_date: string;
}

interface AppointmentsContextType {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  isLoading: boolean;
  fetchAppointments: () => void;
  fetchUpcomingAppointments: () => void;
  createNewAppointment: (appointmentData: any) => void;
  updateExistingAppointment: (id: string, appointmentData: any) => void;
  removeAppointment: (id: string) => void;
}

// Default value for context (can be updated later)
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

// Create a provider component
interface AppointmentsProviderProps {
  children: ReactNode;
}

export const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all appointments
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const fetchedAppointments = await getAppointments();
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch upcoming appointments
  const fetchUpcomingAppointments = async () => {
    setIsLoading(true);
    try {
      const fetchedUpcoming = await getUpcomingAppointments();
      setUpcomingAppointments(fetchedUpcoming);
    } catch (error) {
      console.error("Failed to fetch upcoming appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new appointment
  const createNewAppointment = async (appointmentData: any) => {
    try {
      const newAppointment = await createAppointment(appointmentData);
      setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  // Update an existing appointment
  const updateExistingAppointment = async (id: string, appointmentData: any) => {
    try {
      const updatedAppointment = await updateAppointment(id, appointmentData);
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment =>
          appointment.id === id ? updatedAppointment : appointment
        )
      );
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  // Delete an appointment
  const removeAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prevAppointments => 
        prevAppointments.filter(appointment => appointment.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        upcomingAppointments,
        isLoading,
        fetchAppointments,
        fetchUpcomingAppointments,
        createNewAppointment,
        updateExistingAppointment,
        removeAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

// Custom hook to use appointments context
export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentsProvider");
  }
  return context;
};
