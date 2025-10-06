// components/sections/ProjectsSection.tsx
'use client';

import React, { useEffect, useState } from 'react';

import { Project } from '@/types';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
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
        console.log('Fetched projects:', response.data);
        if (response.data.success) {
          setProjects(response.data.data);
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
      <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-800">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-dark-700 rounded w-1/4 mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 dark:bg-dark-700 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 bg-gray-200 dark:bg-dark-700 relative overflow-hidden">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {project.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
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
                        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors text-sm"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#projects"
            className="btn-outline inline-flex items-center space-x-2"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;