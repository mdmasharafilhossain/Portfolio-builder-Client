/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


import { Plus, Edit, Trash2, Eye, Search, Filter, Star, ExternalLink, Github, Code,  BarChart3 } from 'lucide-react';
import Image from 'next/image';
import ProjectEditor from './ProjectEditor';

const MySwal = Swal;

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'normal'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error fetching projects';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const result = await MySwal.fire({
      title: 'Delete Project?',
      html: `Are you sure you want to delete <strong>"${title}"</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3E1E68',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      color: '#1F2937',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300',
        cancelButton: 'bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300'
      }
    });

    if (result.isConfirmed) {
      try {
        await projectAPI.delete(id);
        
        await MySwal.fire({
          title: 'Deleted!',
          text: 'Your project has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#3E1E68',
          background: '#ffffff',
          color: '#1F2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
          }
        });
        
        fetchProjects();
      } catch (error: any) {
        const message = error.response?.data?.message || 'Error deleting project';
        
        await MySwal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonColor: '#3E1E68',
          background: '#ffffff',
          color: '#1F2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
          }
        });
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingProject(null);
  };

  const handleSave = (project: Project) => {
    setShowEditor(false);
    setEditingProject(null);
    fetchProjects();
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const response = await projectAPI.toggleFeatured(project.id);
      if (response.data.success) {
        toast.success(`Project ${response.data.data.featured ? 'featured' : 'unfeatured'} successfully`);
        fetchProjects();
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error updating project';
      toast.error(message);
    }
  };

  // Filter projects based on search and filter criteria
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFeatured = filterFeatured === 'all' || 
      (filterFeatured === 'featured' && project.featured) ||
      (filterFeatured === 'normal' && !project.featured);

    return matchesSearch && matchesFeatured;
  });

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const normalProjects = filteredProjects.filter(project => !project.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#3E1E68]/20 border-t-[#3E1E68] border-r-[#5D2F77] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (showEditor) {
    return (
      <ProjectEditor
        project={editingProject}
        onSave={handleSave}
        onCancel={handleEditorClose}
        mode={editingProject ? 'edit' : 'create'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="w-14 h-14 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-2xl flex items-center justify-center shadow-lg">
                <Code className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                  Project <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Management</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create and manage your amazing portfolio projects
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Stats */}
              <div className="flex items-center space-x-6 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 px-6 py-3 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">{projects.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">
                    {projects.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Featured</div>
                </div>
              </div>

              <button
                onClick={handleCreate}
                className="flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-6 py-3.5 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                <span>Create New Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5D2F77]" size={20} />
              <input
                type="text"
                placeholder="Search projects by title, description, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Featured Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5D2F77]" size={20} />
              <select
                value={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.value as 'all' | 'featured' | 'normal')}
                className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white appearance-none cursor-pointer"
              >
                <option value="all">All Projects</option>
                <option value="featured">Featured Only</option>
                <option value="normal">Normal Only</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-end">
              <div className="bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 px-4 py-3 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                <span className="text-sm font-semibold text-[#3E1E68] dark:text-[#8B5FBF]">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && (
            <section>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-3 h-12 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Featured Projects</h2>
                  <p className="text-gray-600 dark:text-gray-400">Highlighted projects that showcase your best work</p>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Star size={16} fill="currentColor" />
                  <span>{featuredProjects.length} Featured</span>
                </div>
              </div>
              <div className="space-y-6">
                {featuredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={toggleFeatured}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Normal Projects Section */}
          {normalProjects.length > 0 && (
            <section>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-3 h-12 bg-gradient-to-b from-[#3E1E68] to-[#5D2F77] rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">All Projects</h2>
                  <p className="text-gray-600 dark:text-gray-400">Complete collection of your work</p>
                </div>
              </div>
              <div className="space-y-6">
                {normalProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={toggleFeatured}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-12 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full blur-lg opacity-20"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-full border border-gray-100 dark:border-gray-800 shadow-lg">
                  <Code size={64} className="text-gray-300 dark:text-gray-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {searchTerm || filterFeatured !== 'all' ? 'No matching projects found' : 'No projects yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm || filterFeatured !== 'all' 
                  ? 'Try adjusting your search terms or filters to find what you are looking for.' 
                  : 'Get started by creating your first amazing project to showcase your skills.'
                }
              </p>
              {!searchTerm && filterFeatured === 'all' && (
                <button
                  onClick={handleCreate}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Plus size={20} />
                  <span>Create Your First Project</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Project Card Component for Management View
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string, title: string) => void;
  onToggleFeatured: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete, 
  onToggleFeatured 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Project Image */}
          <div className="lg:w-1/4">
            <div className="relative h-48 lg:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 shadow-lg">
              {project.imageUrl && !imageError ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] flex items-center justify-center">
                  <span className="text-white font-bold text-center px-4 text-lg">
                    {project.title}
                  </span>
                </div>
              )}
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    <Star size={12} fill="currentColor" />
                    <span>Featured</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <button
                  onClick={() => onToggleFeatured(project)}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${
                    project.featured
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
                      : 'bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-gray-600 dark:text-gray-400 border border-[#3E1E68]/10 dark:border-[#5D2F77]/20'
                  }`}
                  title={project.featured ? 'Unfeature' : 'Mark as Featured'}
                >
                  <Star size={20} fill={project.featured ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => onEdit(project)}
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-green-600 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-110"
                  title="Edit Project"
                >
                  <Edit size={20} />
                </button>

                <button
                  onClick={() => onDelete(project.id, project.title)}
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-110"
                  title="Delete Project"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 6).map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                    +{project.technologies.length - 6} more
                  </span>
                )}
              </div>
            )}

            {/* Project Links and Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <BarChart3 size={16} className="text-[#5D2F77]" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-colors font-medium"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-colors font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;