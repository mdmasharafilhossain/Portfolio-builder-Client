/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext';
import { loginSchema } from '@/lib/schema';



type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
     
      router.push('/dashboard/create-blog');
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Welcome{' '}
            <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
              Back
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sign in to access your portfolio dashboard
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#5D2F77]" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#5D2F77]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm ${
                    errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-all duration-300 hover:scale-110"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#5D2F77]" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-[#5D2F77]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#3E1E68]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <Sparkles size={18} className="transition-transform group-hover:scale-110" />
                </span>
              )}
            </button>

            {/* Back Link */}
            <div className="text-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] font-medium transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
