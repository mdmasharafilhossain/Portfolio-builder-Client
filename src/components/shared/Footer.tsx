'use client';

import React from 'react';
import Link from 'next/link';

import { Github, Linkedin, Mail, Heart, Sparkles, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-xl blur opacity-30"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={24} />
                </div>
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                Portfolio
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
              Full Stack Developer passionate about creating amazing web experiences with modern technologies. 
              Lets build something extraordinary together.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:scale-110 border border-gray-200 dark:border-gray-800"
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:scale-110 border border-gray-200 dark:border-gray-800"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-3 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:scale-110 border border-gray-200 dark:border-gray-800"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-[#3E1E68] to-[#5D2F77] rounded-full mr-3"></div>
              Quick Links
            </h3>
            <div className="space-y-4">
              <Link href="/" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:translate-x-2 font-medium">
                Home
              </Link>
              <Link href="/about" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:translate-x-2 font-medium">
                About
              </Link>
              <Link href="/projects" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:translate-x-2 font-medium">
                Projects
              </Link>
              <Link href="/blogs" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:translate-x-2 font-medium">
                Blog
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-[#3E1E68] to-[#5D2F77] rounded-full mr-3"></div>
              Lets Connect
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-[#5D2F77]" />
                </div>
                <span className="font-medium">hello@example.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-[#5D2F77]" />
                </div>
                <span className="font-medium">+1 (234) 567-890</span>
              </a>
              <div className="flex items-center space-x-3 text-lg text-gray-600 dark:text-gray-300 group">
                <div className="w-10 h-10 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-[#5D2F77]" />
                </div>
                <span className="font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 flex items-center text-lg font-medium">
              © {currentYear} Portfolio. Crafted with 
              <Heart size={18} className="mx-2 text-red-500 animate-pulse" /> 
              by Mohammad Mashrafil Hossain Mahi
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Built with Next.js & Tailwind CSS
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Deployed on Vercel
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
          <div className="absolute bottom-0 left-10 w-20 h-20 bg-[#3E1E68]/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-10 w-20 h-20 bg-[#5D2F77]/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;