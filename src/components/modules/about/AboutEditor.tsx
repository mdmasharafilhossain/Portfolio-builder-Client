/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { About, AboutEditorProps} from '@/types';
import { aboutAPI } from '@/lib/api';

import Swal from 'sweetalert2';
import { Save, Plus, Trash2, Eye } from 'lucide-react';
import { AboutFormData, aboutFormSchema } from '@/lib/schema';



const AboutEditor: React.FC<AboutEditorProps> = ({ onSave }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<AboutFormData>({
    resolver: zodResolver(aboutFormSchema) as any,
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      avatarUrl: '',
      resumeUrl: '',
      socialLinks: [],
      skills: [],
      experiences: []
    }
  });

  // Field arrays for dynamic fields
  const {
    fields: socialLinksFields,
    append: appendSocialLink,
    remove: removeSocialLink
  } = useFieldArray({
    control,
    name: 'socialLinks'
  });

  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: 'skills'
  });

  const {
    fields: experiencesFields,
    append: appendExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: 'experiences'
  });

  // New item states
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: '' });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: [] as string[]
  });
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data.success) {
        reset(response.data.data);
      }
    } catch (error: any) {
      console.error('Error fetching about data:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load about information',
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AboutFormData) => {
    setSaving(true);

    try {
      const response = await aboutAPI.upsert(data);
      if (response.data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'About information saved successfully',
          timer: 2000,
          showConfirmButton: false
        });

        if (onSave) {
          onSave(response.data.data);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to save about information';
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 3000
      });
    } finally {
      setSaving(false);
    }
  };

  const handleViewLive = () => {
    router.push('/about');
  };

  // Social Links Handlers
  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url && newSocialLink.icon) {
      appendSocialLink({ ...newSocialLink });
      setNewSocialLink({ platform: '', url: '', icon: '' });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill all social link fields',
        timer: 2000
      });
    }
  };

  const confirmRemoveSocialLink = (index: number) => {
    Swal.fire({
      title: 'Remove Social Link?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        removeSocialLink(index);
        Swal.fire('Removed!', 'Social link has been removed.', 'success');
      }
    });
  };

  // Skills Handlers
  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      appendSkill({ ...newSkill });
      setNewSkill({ name: '', level: 50, category: '' });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill skill name and category',
        timer: 2000
      });
    }
  };

  const confirmRemoveSkill = (index: number) => {
    Swal.fire({
      title: 'Remove Skill?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        removeSkill(index);
        Swal.fire('Removed!', 'Skill has been removed.', 'success');
      }
    });
  };

  // Experience Handlers
  const addExperience = () => {
    if (newExperience.company && newExperience.position && newExperience.startDate) {
      appendExperience({
        ...newExperience,
        id: Date.now().toString()
      });
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: []
      });
      setNewTech('');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill company, position, and start date',
        timer: 2000
      });
    }
  };

  const confirmRemoveExperience = (index: number) => {
    Swal.fire({
      title: 'Remove Experience?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        removeExperience(index);
        Swal.fire('Removed!', 'Experience has been removed.', 'success');
      }
    });
  };

  const addTechnologyToExperience = () => {
    if (newTech.trim()) {
      setNewExperience(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnologyFromExperience = (techIndex: number) => {
    setNewExperience(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== techIndex)
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit About Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your personal and professional information
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleViewLive}
              className="btn-secondary flex items-center space-x-2"
            >
              <Eye size={16} />
              <span>View Live Page</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              className="btn-primary flex items-center space-x-2"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save size={16} />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  className="input-field"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title *
                </label>
                <input
                  {...register('title')}
                  className="input-field"
                  placeholder="Full Stack Developer"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="input-field"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  {...register('phone')}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  {...register('location')}
                  className="input-field"
                  placeholder="San Francisco, CA"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  {...register('avatarUrl')}
                  className="input-field"
                  placeholder="https://example.com/avatar.jpg"
                />
                {errors.avatarUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.avatarUrl.message}</p>
                )}
              </div>

              {/* Resume URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume URL
                </label>
                <input
                  {...register('resumeUrl')}
                  className="input-field"
                  placeholder="https://example.com/resume.pdf"
                />
                {errors.resumeUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.resumeUrl.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Professional Bio
            </h3>
            <div>
              <textarea
                {...register('bio')}
                rows={6}
                className="input-field resize-none"
                placeholder="Write about your professional background, skills, and passion..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div>
          </section>

          {/* Social Links */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Social Links
            </h3>
            
            {/* Add New Social Link */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
              <input
                type="text"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink(prev => ({ ...prev, platform: e.target.value }))}
                className="input-field"
                placeholder="Platform (e.g., GitHub)"
              />
              <input
                type="url"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                className="input-field"
                placeholder="https://github.com/username"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSocialLink.icon}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, icon: e.target.value }))}
                  className="input-field flex-1"
                  placeholder="github, linkedin, etc."
                />
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="btn-primary flex items-center space-x-1"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Existing Social Links */}
            <div className="space-y-3">
              {socialLinksFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-4 p-3 bg-white dark:bg-dark-800 rounded-lg border">
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {field.platform}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 truncate">
                      {field.url}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {field.icon}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => confirmRemoveSocialLink(index)}
                    className="p-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Skills
            </h3>
            
            {/* Add New Skill */}
            <div className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-lg">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                placeholder="Skill name"
              />
              <input
                type="text"
                value={newSkill.category}
                onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                className="input-field"
                placeholder="Category"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 w-12">{newSkill.level}%</span>
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="btn-primary flex items-center space-x-1"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Existing Skills */}
            <div className="space-y-4">
              {skillsFields.map((field, index) => (
                <div key={field.id} className="p-4 bg-white dark:bg-dark-800 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {field.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({field.category})
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {field.level}%
                      </span>
                      <button
                        type="button"
                        onClick={() => confirmRemoveSkill(index)}
                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${field.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
              Work Experience
            </h3>
            
            {/* Add New Experience */}
            <div className="p-4 bg-gray-50 dark:bg-dark-800 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                  className="input-field"
                  placeholder="Company name"
                />
                <input
                  type="text"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                  className="input-field"
                  placeholder="Position"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="date"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                  className="input-field"
                />
                <input
                  type="date"
                  value={newExperience.endDate || ''}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                  className="input-field"
                  disabled={newExperience.current}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="current"
                    checked={newExperience.current}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked }))}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="current" className="text-sm text-gray-700 dark:text-gray-300">
                    Currently working here
                  </label>
                </div>
              </div>

              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                className="input-field resize-none"
                placeholder="Job description and responsibilities"
                rows={3}
              />

              {/* Technologies for Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technologies Used
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnologyToExperience();
                      }
                    }}
                    className="input-field flex-1"
                    placeholder="Add technology"
                  />
                  <button
                    type="button"
                    onClick={addTechnologyToExperience}
                    className="btn-primary flex items-center space-x-1"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newExperience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnologyFromExperience(index)}
                        className="ml-2 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Experience</span>
              </button>
            </div>

            {/* Existing Experiences */}
            <div className="space-y-4">
              {experiencesFields.map((field, index) => (
                <div key={field.id} className="p-4 bg-white dark:bg-dark-800 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {field.position}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">{field.company}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => confirmRemoveExperience(index)}
                      className="p-1 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                    {new Date(field.startDate).toLocaleDateString()} -{' '}
                    {field.current ? 'Present' : field.endDate ? new Date(field.endDate).toLocaleDateString() : 'Not specified'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{field.description}</p>
                  {field.technologies && field.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default AboutEditor;