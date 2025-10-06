/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      router.push('/projects');
    } catch (error) {
      // Error handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={28} />
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3">
            Welcome <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Back</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sign in to access your portfolio dashboard
          </p>
        </div>
        
        {/* Login Form */}
        <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#5D2F77]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#5D2F77]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
                    placeholder="Enter your password"
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
              </div>
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

            {/* Back to Home Link */}
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

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Secure access to your professional portfolio
          </p>
        </div>
      </div>
    </div>
  );
}