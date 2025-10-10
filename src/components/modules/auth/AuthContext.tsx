/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';
import { authAPI } from '@/lib/api';
import Swal from 'sweetalert2';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.verify();
      if (response.data.success) {
        setUser(response.data.data.user);
      } else {
        
        setUser(null);
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
     
      setUser(null);
      
     
      if (error.response?.status !== 401 && error.response?.status !== 403) {
        console.warn('Authentication check failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
        
      if (response.data.success) {
        const { user } = response.data.data;
        setUser(user);
       
        await Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: `Hello, ${response.data?.data?.user?.name || 'User'} 👋`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

 
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const response = await authAPI.register(email, password, name);

      if (response.data.success) {
        setUser(response.data.data.user);
        await Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Your account has been created successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      await Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      
    }
  };

  
  const updateUser = (userData: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...userData } : null));
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
