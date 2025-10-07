// components/shared/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  User, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../modules/auth/AuthContext';


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Create Blog',
      href: '/dashboard/create-blog',
      icon: Plus,
    },
    {
      name: 'All Projects',
      href: '/dashboard/projects',
      icon: FolderOpen,
    },
    {
      name: 'About Me',
      href: '/dashboard/about',
      icon: User,
    },
    {
      name: 'Blog Posts',
      href: '/dashboard/blogs',
      icon: FileText,
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`bg-white dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={16} />
                </div>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
                Dashboard
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF]'
                  }`}
                >
                  <item.icon 
                    size={20} 
                    className={isActive ? "text-[#5D2F77]" : "text-gray-400 group-hover:text-[#5D2F77]"} 
                  />
                  {!isCollapsed && (
                    <span className="font-semibold">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {/* User Info */}
        <div className={`flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>

        {/* Settings & Logout */}
        <div className="space-y-2">
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-3 p-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <Settings size={18} />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-3 w-full p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={18} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;