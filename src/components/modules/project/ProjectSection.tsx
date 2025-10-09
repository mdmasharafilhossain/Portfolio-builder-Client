'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { projectAPI } from '@/lib/api';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectAPI.getFeatured();
        
        if (response.data.success) {
          // Take only first 3 projects
          setProjects(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 rounded-full w-48 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-2/3 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-700 h-56 rounded-2xl mb-6"></div>
                  <div className="h-5 bg-gray-300 dark:bg-gray-800 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded mb-4 w-2/3"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-100 dark:border-gray-800 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[#5D2F77]" fill="currentColor" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#5D2F77]">
                    Featured Work
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Featured <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills and experience in modern web development
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Project Image */}
              <div className="h-56 overflow-hidden bg-gradient-to-br from-[#F8F5FF] to-[#EDE7F6] dark:from-[#1a1033] dark:to-[#2d1b4e] relative">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] flex items-center justify-center">
                    <span className="text-white text-xl font-bold text-center px-6">
                      {project.title}
                    </span>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg">
                  <Star size={14} fill="currentColor" />
                  <span>Featured</span>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#5D2F77] dark:group-hover:text-[#8B5FBF] transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] text-xs font-semibold rounded-full border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Action Links */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#5D2F77] hover:text-[#3E1E68] dark:text-[#8B5FBF] dark:hover:text-[#A67FCF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group/button"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} className="transition-transform group-hover/button:translate-x-1" />
          </Link>
          
          {/* Projects Counter */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing <span className="font-semibold text-[#3E1E68] dark:text-[#8B5FBF]">3</span> of many amazing projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;