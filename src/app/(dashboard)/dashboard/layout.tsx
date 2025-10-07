// app/dashboard/layout.tsx
import { AuthProvider } from "@/components/modules/auth/AuthContext";
import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900">
  <div className="flex flex-col md:flex-row">
    <AuthProvider>
    <Sidebar />
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {children}
    </main>
    </AuthProvider>
  </div>
</div>

  );
}