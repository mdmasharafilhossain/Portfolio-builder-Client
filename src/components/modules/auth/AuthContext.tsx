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
  text: `Hello, ${response.data?.data?.user?.name || 'User'} `,
  timer: 2000,
  showConfirmButton: false,
  background: '#1a1033',
  color: '#ffffff',
  customClass: {
    popup: 'rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-500/20',
    title: 'text-2xl font-bold bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent',
    icon: '!border-none !scale-125',
    container: 'backdrop-blur-sm'
  },
  iconHtml: `
    <div class="relative">
      <div class="w-20 h-20 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center relative">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] blur-sm opacity-75 animate-pulse"></div>
      </div>
    </div>
  `,
  showClass: {
    popup: 'animate__animated animate__fadeInDown animate__faster'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp animate__faster'
  }
});
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
     await Swal.fire({
  icon: 'error',
  title: 'Login Failed',
  text: message,
  background: '#1a1033',
  color: '#ffffff',
  customClass: {
    popup: 'rounded-3xl border border-red-500/20 shadow-2xl shadow-red-500/20',
    title: 'text-2xl font-bold text-white',
    htmlContainer: 'text-gray-200',
    icon: '!border-none !scale-125',
    container: 'backdrop-blur-sm'
  },
  iconHtml: `
    <div class="relative">
      <div class="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center relative">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-700 blur-sm opacity-75 animate-pulse"></div>
      </div>
    </div>
  `,
  showClass: {
    popup: 'animate__animated animate__shakeX animate__faster'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp animate__faster'
  },
  confirmButtonText: 'Try Again',
  confirmButtonColor: '#5D2F77',
  buttonsStyling: false,
 
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
