/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ProjectEditorProps } from '@/types';
import { projectAPI } from '@/lib/api';

import Swal from 'sweetalert2';

import { Save, X, Eye, Plus, Trash2, Globe, Github, Image as ImageIcon, Sparkles, Settings } from 'lucide-react';
import Image from 'next/image';
import { projectSchema } from '@/lib/schema';

const MySwal = Swal;

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel, mode }) => {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTech, setNewTech] = useState('');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      longDescription: project?.longDescription || '',
      technologies: project?.technologies || [],
      projectUrl: project?.projectUrl || '',
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      imageUrl: project?.imageUrl || '',
      featured: project?.featured || false,
    },
  });

  const technologies = watch('technologies');
  const watchedData = watch();

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setValue('technologies', [...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    MySwal.fire({
      title: 'Remove Technology?',
      text: `Are you sure you want to remove "${tech}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3E1E68',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      color: '#1F2937',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300',
        cancelButton: 'bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300'
      }
    }).then((result:any) => {
      if (result.isConfirmed) {
        setValue('technologies', technologies.filter(t => t !== tech));
        MySwal.fire({
          title: 'Removed!',
          text: 'Technology has been removed.',
          icon: 'success',
          confirmButtonColor: '#3E1E68',
          background: '#ffffff',
          color: '#1F2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
          }
        });
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };



const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
  setLoading(true);

  try {
    let response;
    if (mode === 'create') {
      response = await projectAPI.create(data);
    } else {
      response = await projectAPI.update(project!.id, data);
    }

    if (response.data.success) {
      onSave(response.data.data);

      await Swal.fire({
        title: 'Success!',
        text: `Project ${mode === 'create' ? 'created' : 'updated'} successfully!`,
        icon: 'success',
        confirmButtonColor: '#3E1E68',
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton:
            'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300',
        },
      });
    }
  } catch (error: any) {
    const message = error.response?.data?.message || `Failed to ${mode} project`;

    await Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#E02424',
      background: '#ffffff',
      color: '#1F2937',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton:
          'bg-gradient-to-r from-[#E02424] to-[#FF5A5A] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300',
      },
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 border-b border-gray-200 dark:border-gray-800 px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                    {mode === 'create' ? 'Create New' : 'Edit'} <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Project</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {mode === 'create' ? 'Build your amazing project portfolio' : 'Update your project details'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Eye size={18} />
                  <span>{preview ? 'Edit' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  <span>Save Project</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {preview ? (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                  {watchedData.title}
                </h1>
                
                {watchedData.imageUrl && (
                  <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src={watchedData.imageUrl || ''}
                      alt={watchedData.title || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {watchedData.description}
                </p>
                
                <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {watchedData.longDescription?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    {technologies.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Sparkles className="text-[#5D2F77] mr-2" size={20} />
                        Project Title *
                      </label>
                      <input 
                        {...register('title')} 
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter your project title..." 
                      />
                      {errors.title && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Short Description *
                      </label>
                      <textarea 
                        {...register('description')} 
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        rows={3} 
                        placeholder="Brief project description..." 
                      />
                      {errors.description && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    {/* Project Image URL */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <ImageIcon className="text-[#5D2F77] mr-2" size={20} />
                        Project Image URL
                      </label>
                      <input 
                        {...register('imageUrl')} 
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="https://example.com/project-image.png" 
                      />
                      {errors.imageUrl && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.imageUrl.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* URLs */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Globe className="text-[#5D2F77] mr-2" size={20} />
                          Project URL
                        </label>
                        <input 
                          {...register('projectUrl')} 
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="https://example-project.com" 
                        />
                        {errors.projectUrl && (
                          <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                            {errors.projectUrl.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Github className="text-[#5D2F77] mr-2" size={20} />
                          GitHub URL
                        </label>
                        <input 
                          {...register('githubUrl')} 
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="https://github.com/username/project" 
                        />
                        {errors.githubUrl && (
                          <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                            {errors.githubUrl.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Globe className="text-[#5D2F77] mr-2" size={20} />
                          Live Demo URL
                        </label>
                        <input 
                          {...register('liveUrl')} 
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="https://live-demo.com" 
                        />
                        {errors.liveUrl && (
                          <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                            {errors.liveUrl.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Featured Toggle */}
                    <div className="bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-2xl p-6 border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            {...register('featured')}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                            watchedData.featured ? 'bg-[#3E1E68]' : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                              watchedData.featured ? 'transform translate-x-6' : ''
                            }`}></div>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Featured Project
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Highlight this project on your portfolio
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Settings className="text-[#5D2F77] mr-2" size={20} />
                    Technologies & Tools
                  </label>
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <input 
                        value={newTech} 
                        onChange={(e) => setNewTech(e.target.value)} 
                        onKeyPress={handleKeyPress} 
                        className="flex-1 px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Add a technology (e.g., React, Node.js)" 
                      />
                      <button 
                        type="button" 
                        onClick={addTechnology} 
                        className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                      >
                        <Plus size={18} />
                        <span>Add</span>
                      </button>
                    </div>
                    
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {technologies.map((tech, idx) => (
                          <span key={idx} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105">
                            {tech}
                            <button type="button" onClick={() => removeTechnology(tech)} className="ml-2 hover:text-red-600 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {errors.technologies && (
                      <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                        {errors.technologies.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Detailed Description *
                  </label>
                  <textarea 
                    {...register('longDescription')} 
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y"
                    rows={6} 
                    placeholder="Describe your project in detail. Include features, challenges, and what you learned..." 
                  />
                  {errors.longDescription && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.longDescription.message}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;