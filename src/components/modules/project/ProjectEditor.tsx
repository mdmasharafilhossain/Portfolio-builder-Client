/* eslint-disable @typescript-eslint/no-explicit-any */
// components/editor/ProjectEditor.tsx
'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '@/types';
import { projectAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Save, X, Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectEditorProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(78, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
    longDescription: z.string().min(1, 'Long description is required'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  projectUrl: z.string().url('Project URL must be valid').optional().or(z.literal('')),
  githubUrl: z.string().url('GitHub URL must be valid').optional().or(z.literal('')),
  liveUrl: z.string().url('Live Demo URL must be valid').optional().or(z.literal('')),
  featured: z.boolean(),
  imageUrl: z.string().url('Image URL must be valid').optional().or(z.literal('')),
});

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

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setValue('technologies', [...technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setValue('technologies', technologies.filter(t => t !== tech));
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
        toast.success(`Project ${mode === 'create' ? 'created' : 'updated'} successfully!`);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || `Failed to ${mode} project`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Create New Project' : 'Edit Project'}
          </h2>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye size={16} />
              <span>{preview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex items-center space-x-2"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save size={16} />
              )}
              <span>Save</span>
            </button>
          </div>
        </div>

        {preview ? (
          <div className="prose dark:prose-invert max-w-none">
            <h1>{watch('title')}</h1>
            {watch('imageUrl') && (
              <Image
                src={watch('imageUrl') || ''} 
                alt={watch('title') || ''}
                height={200}
                width={400}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{watch('description')}</p>
            <p className="text-gray-600 dark:text-gray-300">{watch('longDescription')}</p>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input {...register('title')} className="input-field" placeholder="Project title" />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description *</label>
                  <textarea {...register('description')} className="input-field resize-none" rows={3} placeholder="Brief project description" />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Image URL</label>
                  <input {...register('imageUrl')} className="input-field" placeholder="https://example.com/image.png" />
                  {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project URL</label>
                  <input {...register('projectUrl')} className="input-field" placeholder="https://example-project.com" />
                  {errors.projectUrl && <p className="text-red-500 text-sm mt-1">{errors.projectUrl.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                  <input {...register('githubUrl')} className="input-field" placeholder="https://github.com/username/project" />
                  {errors.githubUrl && <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Demo URL</label>
                  <input {...register('liveUrl')} className="input-field" placeholder="https://live-demo.com" />
                  {errors.liveUrl && <p className="text-red-500 text-sm mt-1}">{errors.liveUrl.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <input {...register('featured')} type="checkbox" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input value={newTech} onChange={(e) => setNewTech(e.target.value)} onKeyPress={handleKeyPress} className="input-field flex-1" placeholder="Add a technology" />
                  <button type="button" onClick={addTechnology} className="btn-primary flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, idx) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm">
                        {tech}
                        <button type="button" onClick={() => removeTechnology(tech)} className="ml-2 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.technologies && <p className="text-red-500 text-sm mt-1">{errors.technologies.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Description *</label>
              <textarea {...register('longDescription')} className="input-field resize-none" rows={6} placeholder="Describe your project in detail..." />
              {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription.message}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProjectEditor;
