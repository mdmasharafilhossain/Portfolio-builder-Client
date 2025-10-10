/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {  AboutEditorProps} from '@/types';
import { aboutAPI } from '@/lib/api';

import Swal from 'sweetalert2';

import { Save, Plus, Trash2, Eye, User, FileText, Link2, Award, Briefcase, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { AboutFormData, aboutFormSchema } from '@/lib/schema';
import { Loader } from '@/components/shared/Loader';

const MySwal = Swal;

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
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load about information',
        timer: 3000,
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
        }
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
        await MySwal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'About information saved successfully',
          timer: 2000,
          showConfirmButton: false,
          background: '#ffffff',
          color: '#1F2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl'
          }
        });

        if (onSave) {
          onSave(response.data.data);
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to save about information';
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 3000,
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
        }
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
      MySwal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill all social link fields',
        timer: 2000,
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl'
        }
      });
    }
  };

  const confirmRemoveSocialLink = (index: number) => {
    MySwal.fire({
      title: 'Remove Social Link?',
      text: 'This action cannot be undone',
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
    }).then((result) => {
      if (result.isConfirmed) {
        removeSocialLink(index);
        MySwal.fire({
          title: 'Removed!',
          text: 'Social link has been removed.',
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

  // Skills Handlers
  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      appendSkill({ ...newSkill });
      setNewSkill({ name: '', level: 50, category: '' });
    } else {
      MySwal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill skill name and category',
        timer: 2000,
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl'
        }
      });
    }
  };

  const confirmRemoveSkill = (index: number) => {
    MySwal.fire({
      title: 'Remove Skill?',
      text: 'This action cannot be undone',
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
    }).then((result) => {
      if (result.isConfirmed) {
        removeSkill(index);
        MySwal.fire({
          title: 'Removed!',
          text: 'Skill has been removed.',
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
      MySwal.fire({
        icon: 'warning',
        title: 'Incomplete Information',
        text: 'Please fill company, position, and start date',
        timer: 2000,
        background: '#ffffff',
        color: '#1F2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl'
        }
      });
    }
  };

  const confirmRemoveExperience = (index: number) => {
    MySwal.fire({
      title: 'Remove Experience?',
      text: 'This action cannot be undone',
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
    }).then((result) => {
      if (result.isConfirmed) {
        removeExperience(index);
        MySwal.fire({
          title: 'Removed!',
          text: 'Experience has been removed.',
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
    return <Loader/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 border-b border-gray-200 dark:border-gray-800 px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-14 h-14 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="text-white" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                    Edit <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">About</span> Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Update your personal and professional information
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleViewLive}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Eye size={18} />
                  <span>View Live Page</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Basic Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                  <User className="text-white" size={16} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Basic Information
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Sparkles className="text-[#5D2F77] mr-2" size={20} />
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Professional Title *
                  </label>
                  <input
                    {...register('title')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Full Stack Developer"
                  />
                  {errors.title && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Mail className="text-[#5D2F77] mr-2" size={20} />
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Phone className="text-[#5D2F77] mr-2" size={20} />
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <MapPin className="text-[#5D2F77] mr-2" size={20} />
                    Location
                  </label>
                  <input
                    {...register('location')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="San Francisco, CA"
                  />
                  {errors.location && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Avatar URL */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Avatar URL
                  </label>
                  <input
                    {...register('avatarUrl')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  {errors.avatarUrl && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.avatarUrl.message}
                    </p>
                  )}
                </div>

                {/* Resume URL */}
                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <FileText className="text-[#5D2F77] mr-2" size={20} />
                    Resume URL
                  </label>
                  <input
                    {...register('resumeUrl')}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="https://example.com/resume.pdf"
                  />
                  {errors.resumeUrl && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.resumeUrl.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Bio Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                  <FileText className="text-white" size={16} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Professional Bio
                </h3>
              </div>
              <div>
                <textarea
                  {...register('bio')}
                  rows={6}
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Write about your professional background, skills, and passion..."
                />
                {errors.bio && (
                  <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </section>

            {/* Social Links */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                  <Link2 className="text-white" size={16} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Social Links
                </h3>
              </div>
              
              {/* Add New Social Link */}
              <div className="grid md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                <input
                  type="text"
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, platform: e.target.value }))}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Platform (e.g., GitHub)"
                />
                <input
                  type="url"
                  value={newSocialLink.url}
                  onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="https://github.com/username"
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSocialLink.icon}
                    onChange={(e) => setNewSocialLink(prev => ({ ...prev, icon: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="github, linkedin, etc."
                  />
                  <button
                    type="button"
                    onClick={addSocialLink}
                    className="flex items-center space-x-1 px-4 py-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Existing Social Links */}
              <div className="space-y-3">
                {socialLinksFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
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
                      className="p-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                  <Award className="text-white" size={16} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Skills
                </h3>
              </div>
              
              {/* Add New Skill */}
              <div className="grid md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Skill name"
                />
                <input
                  type="text"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Category"
                />
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm font-semibold text-[#3E1E68] dark:text-[#8B5FBF] w-12">{newSkill.level}%</span>
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Existing Skills */}
              <div className="space-y-4">
                {skillsFields.map((field, index) => (
                  <div key={field.id} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {field.name}
                        </span>
                        <span className="ml-3 px-3 py-1 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold">
                          {field.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-[#3E1E68] dark:text-[#8B5FBF]">
                          {field.level}%
                        </span>
                        <button
                          type="button"
                          onClick={() => confirmRemoveSkill(index)}
                          className="p-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] h-3 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${field.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-xl flex items-center justify-center">
                  <Briefcase className="text-white" size={16} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Work Experience
                </h3>
              </div>
              
              {/* Add New Experience */}
              <div className="p-6 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                    className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Company name"
                  />
                  <input
                    type="text"
                    value={newExperience.position}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                    className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Position"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="date"
                    value={newExperience.startDate}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white"
                  />
                  <input
                    type="date"
                    value={newExperience.endDate || ''}
                    onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white"
                    disabled={newExperience.current}
                  />
                  <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700">
                    <input
                      type="checkbox"
                      id="current"
                      checked={newExperience.current}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked }))}
                      className="w-4 h-4 text-[#3E1E68] bg-gray-100 border-gray-300 rounded focus:ring-[#3E1E68] focus:ring-2"
                    />
                    <label htmlFor="current" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Currently working here
                    </label>
                  </div>
                </div>

                <textarea
                  value={newExperience.description}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Job description and responsibilities"
                  rows={3}
                />

                {/* Technologies for Experience */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </label>
                  <div className="flex space-x-3 mb-3">
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
                      className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Add technology"
                    />
                    <button
                      type="button"
                      onClick={addTechnologyToExperience}
                      className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newExperience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105"
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
                  className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <Plus size={18} />
                  <span>Add Experience</span>
                </button>
              </div>

              {/* Existing Experiences */}
              <div className="space-y-4">
                {experiencesFields.map((field, index) => (
                  <div key={field.id} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {field.position}
                        </h4>
                        <p className="text-lg text-[#3E1E68] dark:text-[#8B5FBF] font-semibold">{field.company}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => confirmRemoveExperience(index)}
                        className="p-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                      {new Date(field.startDate).toLocaleDateString()} -{' '}
                      {field.current ? 'Present' : field.endDate ? new Date(field.endDate).toLocaleDateString() : 'Not specified'}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{field.description}</p>
                    {field.technologies && field.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {field.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20"
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
    </div>
  );
};

export default AboutEditor;