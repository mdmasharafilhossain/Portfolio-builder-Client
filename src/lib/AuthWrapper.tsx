'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import Sidebar from '@/components/shared/Sidebar';
import { useAuth } from '@/components/modules/auth/AuthContext';

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'You need to log in to access the dashboard.',
        icon: 'error',
        confirmButtonText: 'Go to Login',
        confirmButtonColor: '#7C3AED', 
      }).then(() => {
        router.push('/login');
      });
    }
  }, [user, router]);

  if (!user) {
    
    return <div className="flex items-center justify-center min-h-screen">Checking authorization...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen md:ml-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="md:mt-0 mt-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
