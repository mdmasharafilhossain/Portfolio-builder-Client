/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Save, X, Eye, Sparkles, Image as ImageIcon, Tag, Link, FileText } from 'lucide-react';
import Image from 'next/image';
import {  BlogEditorProps, BlogFormData } from '@/types';
import { blogAPI } from '@/lib/api';
import { blogSchema } from '@/lib/schema';
import Swal from 'sweetalert2';





const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel, mode }) => {
  const [preview, setPreview] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema) as any,
    defaultValues: {
      title: blog?.title || '',
      content: blog?.content || '',
      excerpt: blog?.excerpt || '',
      slug: blog?.slug || '',
      imageUrl: blog?.imageUrl || '',
      tags: blog?.tags?.join(', ') || '',
      published: blog?.published ?? true,
    },
  });

  const watchedData = watch();

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        tags: data.tags
          ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          : [],
      };

      let response;
      if (mode === 'create') {
        response = await blogAPI.create(formattedData);
      } else {
        response = await blogAPI.update(blog!.id, formattedData);
      }

      if (response.data.success) {
        onSave(response.data.data);
        Swal.fire({
        icon: 'success',
        title: `Blog ${mode === 'create' ? 'Created' : 'Updated'}!`,
        text: `Your blog has been ${mode === 'create' ? 'created' : 'updated'} successfully.`,
        confirmButtonColor: '#5D2F77',
      });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || `Failed to ${mode} blog`;
       Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#5D2F77',
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                    {mode === 'create' ? 'Create New Blog' : 'Edit Blog'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {mode === 'create' ? 'Craft your next amazing blog post' : 'Update your blog content'}
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
                  type="submit"
                  form="blog-form"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Save size={18} />
                  )}
                  <span>Save Blog</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Preview Mode */}
            {preview ? (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
                  {watchedData.title}
                </h1>
                
                {watchedData.imageUrl && (
                  <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src={watchedData.imageUrl}
                      alt={watchedData.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {watchedData.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {watchedData.tags && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    {watchedData.tags.split(',').map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] rounded-full text-sm font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Sparkles className="text-[#5D2F77] mr-2" size={20} />
                        Blog Title *
                      </label>
                      <input
                        {...register('title')}
                        onBlur={(e) => {
                          if (!watchedData.slug) {
                            const slug = generateSlug(e.target.value);
                            (document.getElementById('slug') as HTMLInputElement).value = slug;
                          }
                        }}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter your amazing blog title..."
                      />
                      {errors.title && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Link className="text-[#5D2F77] mr-2" size={20} />
                        URL Slug *
                      </label>
                      <input
                        id="slug"
                        {...register('slug')}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="blog-post-url-slug"
                      />
                      {errors.slug && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.slug.message}
                        </p>
                      )}
                    </div>

                    {/* Featured Image */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <ImageIcon className="text-[#5D2F77] mr-2" size={20} />
                        Featured Image URL
                      </label>
                      <input
                        {...register('imageUrl')}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="https://example.com/featured-image.jpg"
                      />
                      {errors.imageUrl && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.imageUrl.message}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Tag className="text-[#5D2F77] mr-2" size={20} />
                        Tags
                      </label>
                      <input
                        {...register('tags')}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="technology, web development, javascript"
                      />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Separate multiple tags with commas
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Excerpt */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Blog Excerpt *
                      </label>
                      <textarea
                        {...register('excerpt')}
                        rows={4}
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        placeholder="Write a compelling excerpt that summarizes your blog post..."
                      />
                      {errors.excerpt && (
                        <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                          {errors.excerpt.message}
                        </p>
                      )}
                    </div>

                    {/* Published Toggle */}
                    <div className="bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 rounded-2xl p-6 border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            {...register('published')}
                            className="sr-only"
                          />
                          <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                            watchedData.published ? 'bg-[#3E1E68]' : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                              watchedData.published ? 'transform translate-x-6' : ''
                            }`}></div>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Publish Blog
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Make this blog visible to visitors
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Blog Content *
                  </label>
                  <textarea
                    {...register('content')}
                    rows={12}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-y"
                    placeholder="Write your engaging blog content here. You can use markdown formatting..."
                  />
                  {errors.content && (
                    <p className="mt-2 text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
                      {errors.content.message}
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

export default BlogEditor;