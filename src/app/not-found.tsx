"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#3E1E68]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#5D2F77]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#3E1E68]/5 to-[#5D2F77]/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-md text-center">
        {/* Main 404 illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Outer circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full opacity-20 animate-pulse"></div>
            {/* Inner circle */}
            <div className="absolute inset-4 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3E1E68] rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#5D2F77] rounded-full animate-bounce delay-300"></div>
          </div>
          
          <svg className="w-24 h-24 mx-auto mb-4 text-[#3E1E68] dark:text-purple-300 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-7xl font-bold bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Sorry, we could not find the page you are looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 hover:from-[#5D2F77] hover:to-[#3E1E68]"
          >
            <span className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Back Home
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] blur-sm group-hover:blur-md transition-all duration-300 opacity-75 group-hover:opacity-100"></div>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:border-[#3E1E68] hover:text-[#3E1E68] dark:hover:border-purple-400 dark:hover:text-purple-400 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Additional help text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          If you believe this is an error, please contact support.
        </p>

        {/* Decorative separator */}
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#3E1E68] to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}