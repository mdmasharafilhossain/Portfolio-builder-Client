/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
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

  // ✅ Login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      if (response.data.success) {
        setUser(response.data?.data?.user);
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

  // ✅ Register
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

  // ✅ Logout
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      await Swal.fire({
        icon: 'info',
        title: 'Logged out successfully',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // ✅ Update user info in context
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

// ✅ Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
