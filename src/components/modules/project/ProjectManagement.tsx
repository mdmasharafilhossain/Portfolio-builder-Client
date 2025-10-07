/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { projectAPI } from '@/lib/api';
import toast from 'react-hot-toast';

import { Plus, Edit, Trash2, Eye, Search, Filter, Star, ExternalLink, Github } from 'lucide-react';

import Image from 'next/image';
import ProjectEditor from './ProjectEditor';

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      await projectAPI.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error deleting project';
      toast.error(message);
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage your portfolio projects
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by title, description, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Featured Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as 'all' | 'featured' | 'normal')}
              className="input-field pl-10 appearance-none cursor-pointer"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="normal">Normal Only</option>
            </select>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-yellow-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm font-medium">
                {featuredProjects.length} featured
              </span>
            </div>
            <div className="grid gap-6">
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Projects</h2>
            <div className="grid gap-6">
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
          <div className="card p-12 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterFeatured !== 'all' 
                ? 'Try adjusting your search terms or filters' 
                : 'Get started by creating your first project'
              }
            </p>
            {!searchTerm && filterFeatured === 'all' && (
              <button
                onClick={handleCreate}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus size={20} />
                <span>Create Your First Project</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Project Card Component for Management View
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
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
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Project Image */}
        <div className="lg:w-1/4">
          <div className="relative h-48 lg:h-32 rounded-lg overflow-hidden bg-gray-200 dark:bg-dark-700">
            {project.imageUrl && !imageError ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                height={200}
                width={400}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-center px-4">
                  {project.title}
                </span>
              </div>
            )}
            {project.featured && (
              <div className="absolute top-2 left-2">
                <div className="flex items-center space-x-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
              <button
                onClick={() => onToggleFeatured(project)}
                className={`p-2 rounded-lg transition-colors ${
                  project.featured
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-400'
                }`}
                title={project.featured ? 'Unfeature' : 'Mark as Featured'}
              >
                <Star size={18} fill={project.featured ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={() => onEdit(project)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 transition-colors"
                title="Edit Project"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => onDelete(project.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 transition-colors"
                title="Delete Project"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 5).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400 rounded-full text-sm">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Project Links and Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
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
                    className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick View Actions */}
            <div className="flex items-center space-x-3">
              <a
                href={`/projects/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                <Eye size={16} />
                <span>View Live</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;