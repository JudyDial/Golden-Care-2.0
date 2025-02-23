"use client"
"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { loginUser, logoutUser, signUpUser, getUserDetails, updateIndividual } from '@/handler/api'; 
import { useRouter } from 'next/navigation';

interface AuthContextData {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password1: string, password2: string, userType: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: any) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => {},
  signUp: async () => {},
  logout: async () => {},
  updateUser: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Fetch user data and update state when a user logs in or refreshes
  const refreshUserData = async () => {
    const token = await localStorage.getItem('accessToken');
    if (token) {
      try {
        const userData = await getUserDetails();
        setUser(userData[0]); // Update user state with fetched data
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshUserData();
    }
  }, [isAuthenticated]);


  useEffect(() => {
    // Watch for changes in the `user` state
    if (user) {
      // After the user state is updated, perform redirection based on user type
      if (user.user_type === "provider") {
        router.push('/provider/Dashboard');
      } else if (user.user_type === "admin") {
        router.push('/admin/Dashboard');
      } else if (user.user_type === "patient") {
        router.push('/user/Dashboard');
      }

    }
  }, [user,router]); // This effect runs whenever `user` changes

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setUser(null); // Reset user state before logging in

      const response = await loginUser(email, password);
      const token = response.access;
      
      if (token) {
        localStorage.setItem('accessToken', token);
        await refreshUserData();  // Fetch the full user details after login
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password1: string, password2: string, userType: string) => {
    try {
      setLoading(true);
      const response = await signUpUser(email, password1, password2, userType);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Sign Up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null); // Reset user state on logout
      setIsAuthenticated(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData: any) => {
    try {
      setLoading(true);
      const response = await updateIndividual(updatedData);
      setUser((prevUser: any) => ({
        ...prevUser,
        response,
      }));
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
