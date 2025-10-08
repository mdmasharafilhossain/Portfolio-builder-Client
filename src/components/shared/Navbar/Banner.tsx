/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Code, Palette, Rocket } from 'lucide-react';

const Banner = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-6 h-6 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float animation-delay-1000">
        <div className="w-4 h-4 bg-[#5D2F77] rounded-full opacity-30"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float animation-delay-1500">
        <div className="w-8 h-8 bg-[#3E1E68] rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Welcome Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
              <Sparkles className="text-[#5D2F77]" size={20} />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Welcome to my Portfolio
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
                  Mahi
                </span>
              </h1>
              
              {/* Animated Role Text */}
              <div className="h-20 flex items-center justify-center lg:justify-start">
                <div className="text-2xl md:text-4xl font-bold text-gray-600 dark:text-gray-400">
                  I'm a{' '}
                  <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent animate-typing">
                    {roles[currentRole]}
                  </span>
                  <span className="animate-blink">|</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              I create <span className="text-[#3E1E68] dark:text-[#8B5FBF] font-semibold">beautiful</span> and{' '}
              <span className="text-[#5D2F77] dark:text-[#A67FCF] font-semibold">functional</span> digital experiences 
              that make the web a better place.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5D2F77] dark:text-[#A67FCF]">3+</div>
                <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>View My Work</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center space-x-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Get In Touch</span>
                <Mail size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Github size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Mail size={22} />
              </a>
              <a
                href="/resume.pdf"
                className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Download size={22} />
              </a>
            </div>
          </div>

          {/* Right Content - Visual Elements */}
          <div className="relative">
            {/* Main Graphic */}
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background Circle */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full opacity-10 blur-3xl transform scale-150"></div>
              
              {/* Floating Cards */}
              <div className="relative space-y-6">
                {/* Card 1 */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-4 animate-float">
                  <Code className="text-[#3E1E68] mb-2" size={24} />
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Clean Code</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Quality First</div>
                </div>

                {/* Card 2 */}
                <div className="absolute top-20 -right-10 w-32 h-32 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-4 animate-float animation-delay-1000">
                  <Palette className="text-[#5D2F77] mb-2" size={24} />
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Beautiful UI</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pixel Perfect</div>
                </div>

                {/* Card 3 */}
                <div className="absolute bottom-20 -left-5 w-32 h-32 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-4 animate-float animation-delay-2000">
                  <Rocket className="text-[#3E1E68] mb-2" size={24} />
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Fast & Reliable</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">High Performance</div>
                </div>

                {/* Central Avatar/Graphic */}
                <div className="relative w-80 h-80 mx-auto bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-black mb-2">M</div>
                    <div className="text-sm font-semibold opacity-90">Full Stack Dev</div>
                  </div>
                  
                  {/* Animated Ring */}
                  <div className="absolute inset-0 border-4 border-[#3E1E68]/30 rounded-3xl animate-ping-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-typing {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Banner;