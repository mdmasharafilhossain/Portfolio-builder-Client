'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useAuth } from '@/components/modules/auth/AuthContext';

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {

      if (!user) {
        Swal.fire({
          title: 'Unauthorized Access',
          text: 'You need to log in to access the dashboard.',
          icon: 'error',
          confirmButtonText: 'Go to Login',
          confirmButtonColor: '#5D2F77',
          background: '#1a1033',
          color: '#ffffff',
          iconColor: '#8B5CF6',
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-purple-500/20',
            title: 'font-semibold text-xl',
            confirmButton:
              'px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105',
          },
        }).then(() => router.push('/login'));
      }
    
      else if (user.role !== 'ADMIN') {
        Swal.fire({
          title: 'Access Denied',
          text: 'You do not have permission to access this section.',
          icon: 'warning',
          confirmButtonText: 'Go Back',
          confirmButtonColor: '#EAB308',
          background: '#1a1033',
          color: '#ffffff',
          iconColor: '#FACC15',
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-yellow-500/20',
            title: 'font-semibold text-xl',
            confirmButton:
              'px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105',
          },
        }).then(() => router.push('/'));
      }
    }
  }, [user, loading, router]);

 
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-[#5D2F77] rounded-full animate-spin mx-auto mb-4"></div>
            <div className="w-16 h-16 border-4 border-transparent border-t-[#3E1E68] rounded-full animate-spin mx-auto mb-4 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
            Checking authorization...
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Please wait while we verify your access
          </p>
        </div>
      </div>
    );
  }

  
  if (!user || user.role !== 'ADMIN') return null;


  return <>{children}</>;
}
