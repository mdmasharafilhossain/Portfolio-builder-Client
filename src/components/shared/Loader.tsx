"use client";
export const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Centered Loading Animation */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Spinner Ring */}
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-32 h-32 border-4 border-[#3E1E68]/10 rounded-full"></div>
            
            {/* Animated Ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-[#3E1E68] border-r-[#5D2F77] rounded-full animate-spin"></div>
            
            {/* Portfolio Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-semibold font-black bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
          </div>
          
          {/* Loading Text */}
          
        </div>
      </div>
    </div>
  );
};