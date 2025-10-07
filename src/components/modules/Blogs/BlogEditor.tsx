/* eslint-disable @typescript-eslint/no-explicit-any */
// components/editor/BlogEditor.tsx
'use client';

import React, { useState } from 'react';

import { Blog } from '@/types';
import { blogAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { Save, X, Eye, FileText } from 'lucide-react';
import RichTextEditor from '@/components/shared/RichTextEditor';
import Image from 'next/image';

interface BlogEditorProps {
  blog?: Blog | null;
  onSave: (blog: Blog) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  blog,
  onSave,
  onCancel,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    slug: blog?.slug || '',
    imageUrl: blog?.imageUrl || '',
    tags: blog?.tags?.join(', ') || '',
    published: typeof blog?.published === 'boolean' ? blog.published : true,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      let response;
      if (mode === 'create') {
        response = await blogAPI.create(blogData);
      } else {
        response = await blogAPI.update(blog!.id, blogData);
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="card p-6">
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

        {preview ? (
          <div className="prose dark:prose-invert max-w-none">
            <h1>{formData.title}</h1>
            {formData.imageUrl && (
              <Image
                src={formData.imageUrl} 
                height={200}
                width={400}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <div 
              className="text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
            {formData.tags && (
              <div className="flex flex-wrap gap-2 mt-6">
                {formData.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="input-field"
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="input-field"
                    placeholder="blog-post-slug"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="input-field"
                    placeholder="technology, web development, javascript"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Separate tags with commas
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="input-field resize-none"
                    placeholder="Brief description of the blog post"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Write your blog content here..."
                height={500}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;