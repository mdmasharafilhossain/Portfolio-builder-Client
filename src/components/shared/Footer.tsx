// components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';

import { Sun, Moon, Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Portfolio
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Full Stack Developer passionate about creating amazing web experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-dark-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-dark-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-2 bg-white dark:bg-dark-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Home
              </Link>
              <Link href="/#about" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                About
              </Link>
              <Link href="/#projects" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Projects
              </Link>
              <Link href="/blogs" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Blog
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="mailto:hello@example.com" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                hello@example.com
              </a>
              <a href="tel:+1234567890" className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                +1 (234) 567-890
              </a>
              <p className="text-gray-600 dark:text-gray-400">
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 dark:text-gray-400 flex items-center">
            © {currentYear} Portfolio. Made with <Heart size={16} className="mx-1 text-red-500" /> Mohammad Mashrafil Hossain Mahi
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;