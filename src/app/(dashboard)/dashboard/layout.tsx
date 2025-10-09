
import { AuthProvider } from "@/components/modules/auth/AuthContext";
import Sidebar from "@/components/shared/Sidebar";
import AuthWrapper from "@/lib/AuthWrapper";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <AuthProvider>
     <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 min-h-screen md:ml-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
           
            <div className="md:mt-0 mt-16">
              {children}
            </div>
          </main>
        </div>
      </div>
      </AuthWrapper>
    </AuthProvider>
  );
}