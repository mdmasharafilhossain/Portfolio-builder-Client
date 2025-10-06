import { About, ApiResponse, AuthResponse, Blog, Project, User } from '@/types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Enhanced request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on login page or public pages
    const isAuthPage = typeof window !== 'undefined' && 
      (window.location.pathname === '/login' || window.location.pathname === '/register');
    
    const isPublicPage = typeof window !== 'undefined' && 
      !window.location.pathname.startsWith('/admin') && 
      !window.location.pathname.startsWith('/dashboard');

    if (error.response?.status === 401 && !isAuthPage && !isPublicPage) {
      // Only redirect if we're on a protected page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password }),
  
  register: (email: string, password: string, name: string) =>
    api.post<ApiResponse<AuthResponse>>('/auth/register', { email, password, name }),

  getProfile: () =>
    api.get<ApiResponse<User>>('/auth/profile'),

  updateProfile: (data: Partial<User>) =>
    api.put<ApiResponse<User>>('/auth/profile', data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.put<ApiResponse>('/auth/change-password', data),

  logout: () =>
    api.post<ApiResponse>('/auth/logout'),

  verify: () =>
    api.get<ApiResponse<{ user: User }>>('/auth/verify'),
};

// Blog API
export const blogAPI = {
  getAll: () => api.get<ApiResponse<Blog[]>>('/blogs'),
  getBySlug: (slug: string) => api.get<ApiResponse<Blog>>(`/blogs/${slug}`),
//   create: (data: Partial<Blog>) => api.post<ApiResponse<Blog>>('/admin/blogs', data),
//   update: (id: string, data: Partial<Blog>) => api.put<ApiResponse<Blog>>(`/admin/blogs/${id}`, data),
//   delete: (id: string) => api.delete<ApiResponse>(`/admin/blogs/${id}`),
//   getAllAdmin: () => api.get<ApiResponse<Blog[]>>('/admin/blogs'),
};

// Project API
export const projectAPI = {
  getAll: () => api.get<ApiResponse<Project[]>>('/projects'),
  getFeatured: () => api.get<ApiResponse<Project[]>>('/projects/featured'),
  getById: (id: string) => api.get<ApiResponse<Project>>(`/projects/${id}`),
  create: (data: Partial<Project>) => api.post<ApiResponse<Project>>('/admin/projects', data),
  update: (id: string, data: Partial<Project>) => api.put<ApiResponse<Project>>(`/admin/projects/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/admin/projects/${id}`),
  toggleFeatured: (id: string) => api.patch<ApiResponse<Project>>(`/admin/projects/${id}/featured`),
};

// About API
export const aboutAPI = {
  get: () => api.get<ApiResponse<About>>('/about'),
  getSummary: () => api.get<ApiResponse<Partial<About>>>('/about/summary'),
  update: (data: Partial<About>) => api.put<ApiResponse<About>>('/admin/about', data),
  upsert: (data: Partial<About>) => api.patch<ApiResponse<About>>('/admin/about', data),
};