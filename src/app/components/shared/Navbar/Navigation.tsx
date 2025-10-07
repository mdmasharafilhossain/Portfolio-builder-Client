'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  User,
  LogOut,
  Settings,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../modules/auth/AuthContext';
import { Loader } from '../Loader';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated ,loading} = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
  };

  console.log(user," user from nav");

  // Helper function to check if a route is active
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  if (loading) {
    return <Loader/>; // or a loading spinner
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
             
            </div>
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 font-semibold transition-all duration-300 group/nav ${
                    isActive 
                      ? 'text-[#3E1E68] dark:text-[#8B5FBF]' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    {user?.name}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 py-3 z-50 animate-in fade-in-0 zoom-in-95">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 group/item ${
                        isActiveRoute('/dashboard')
                          ? 'bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={18} className={isActiveRoute('/dashboard') ? "text-[#5D2F77]" : "text-gray-500"} />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group/item"
                    >
                      <LogOut size={18} />
                      <span className="font-medium group-hover/item:text-red-700 transition-colors">
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-6 py-2.5 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg ${
                  isActiveRoute('/login') ? 'ring-2 ring-[#3E1E68] ring-opacity-50' : ''
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl mt-3 py-4 animate-in fade-in-0 slide-in-from-top-5">
            <div className="flex flex-col space-y-1 px-4">
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 font-semibold rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF]'
                        : 'text-gray-700 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:bg-gradient-to-r hover:from-[#F8F5FF] hover:to-[#EDE7F6] dark:hover:from-[#3E1E68]/10 dark:hover:to-[#5D2F77]/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-800 mt-3 pt-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActiveRoute('/dashboard')
                          ? 'bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF]'
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:bg-gradient-to-r hover:from-[#F8F5FF] hover:to-[#EDE7F6] dark:hover:from-[#3E1E68]/10 dark:hover:to-[#5D2F77]/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings size={18} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-left px-4 py-3 text-red-600 hover:text-red-700 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={`flex items-center justify-center space-x-2 font-semibold px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 mx-4 mt-2 ${
                      isActiveRoute('/login')
                        ? 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white ring-2 ring-[#3E1E68] ring-opacity-50'
                        : 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white hover:shadow-lg'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;