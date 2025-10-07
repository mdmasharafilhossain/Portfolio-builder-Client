/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Save, X, Eye } from 'lucide-react';
import Image from 'next/image';
import { Blog } from '@/types';
import { blogAPI } from '@/lib/api';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
    content: z.string().min(1, 'Content is required'),
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.string().optional(),
  published: z.boolean().default(true),
}).transform((data) => ({
  ...data,
  published: data.published ?? true,
}));


type BlogFormData = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  tags?: string;
  published: boolean;
};

interface BlogEditorProps {
  blog?: Blog | null;
  onSave: (blog: Blog) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

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
      toast.success(`Blog ${mode === 'create' ? 'created' : 'updated'} successfully!`);
    }
  } catch (error: any) {
    const message = error.response?.data?.message || `Failed to ${mode} blog`;
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Create New Blog' : 'Edit Blog'}
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
              type="submit"
              form="blog-form"
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

        {/* Preview Mode */}
        {preview ? (
          <div className="prose dark:prose-invert max-w-none">
            <h1>{watchedData.title}</h1>
            {watchedData.imageUrl && (
              <Image
                src={watchedData.imageUrl}
                height={200}
                width={400}
                alt={watchedData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <p className="text-gray-700 dark:text-gray-300">{watchedData.content}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {watchedData.tags &&
                watchedData.tags.split(',').map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        ) : (
          <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    {...register('title')}
                    onBlur={(e) => {
                      if (!watchedData.slug) {
                        const slug = generateSlug(e.target.value);
                        (document.getElementById('slug') as HTMLInputElement).value = slug;
                      }
                    }}
                    className="input-field"
                    placeholder="Enter blog title"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    id="slug"
                    {...register('slug')}
                    className="input-field"
                    placeholder="blog-post-slug"
                  />
                  {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                  <input
                    {...register('imageUrl')}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    {...register('tags')}
                    className="input-field"
                    placeholder="technology, web development, javascript"
                  />
                  <p className="text-sm text-gray-500">Separate tags with commas</p>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt *</label>
                  <textarea
                    {...register('excerpt')}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Brief description of the blog post"
                  />
                  {errors.excerpt && (
                    <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
                  )}
                </div>

                {/* Published */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('published')}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label className="text-sm font-medium">Publish immediately</label>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                {...register('content')}
                rows={10}
                className="input-field resize-y"
                placeholder="Write your blog content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
