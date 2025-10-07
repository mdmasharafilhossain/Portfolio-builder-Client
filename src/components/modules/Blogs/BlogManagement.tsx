/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { blogAPI } from '@/lib/api';
import { Blog } from '@/types';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


import { Plus, Edit, Trash2, Eye, Search, FileText, Sparkles, BarChart3, Calendar, User } from 'lucide-react';
import BlogEditor from './BlogEditor';
import { Loader } from '@/components/shared/Loader';



export default function BlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllAdmin();
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
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
        await blogAPI.delete(id);
        
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your blog post has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3E1E68',
          confirmButtonText: 'OK',
          background: '#ffffff',
          color: '#1F2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
          }
        });
        
        fetchBlogs();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete blog post.',
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

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  const handleSave = (blog: Blog) => {
    setShowEditor(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <Loader/>
  }

  if (showEditor) {
    return (
      <BlogEditor
        blog={editingBlog}
        onSave={handleSave}
        onCancel={handleEditorClose}
        mode={editingBlog ? 'edit' : 'create'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#F8F5FF] to-gray-100 dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
             
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                  Blog <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Management</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create, edit, and manage your amazing blog posts
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Stats */}
              <div className="flex items-center space-x-6 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 px-6 py-3 rounded-2xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">{blogs.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3E1E68] dark:text-[#8B5FBF]">
                    {blogs.filter(b => b.published).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Published</div>
                </div>
              </div>

              <button
                onClick={handleCreate}
                className="flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-6 py-3.5 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                <span>Create New Blog</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5D2F77]" size={20} />
            <input
              type="text"
              placeholder="Search blogs by title, excerpt, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-[#3E1E68]/20 focus:border-[#3E1E68] transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="space-y-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {blog.title}
                          </h3>
                          {blog.published ? (
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-full shadow-lg">
                              Published
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-semibold rounded-full shadow-lg">
                              Draft
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-lg leading-relaxed">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 text-[#3E1E68] dark:text-[#8B5FBF] text-sm font-semibold rounded-full border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <User size={16} className="text-[#5D2F77]" />
                            <span>By {blog.author.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-[#5D2F77]" />
                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 lg:space-x-2 lg:flex-col lg:space-y-2 mt-4 lg:mt-0 lg:ml-6">
                    <a
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-[#3E1E68] dark:text-[#8B5FBF] rounded-xl border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 hover:shadow-lg transition-all duration-300 hover:scale-110"
                      title="View Live"
                    >
                      <Eye size={20} />
                    </a>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-green-600 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-110"
                      title="Edit Blog"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-110"
                      title="Delete Blog"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-12 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-8 rounded-full border border-gray-100 dark:border-gray-800 shadow-lg">
                <FileText size={64} className="text-gray-300 dark:text-gray-700" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {searchTerm ? 'No matching blogs found' : 'No blogs yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchTerm ? 'Try adjusting your search terms or create a new blog post' : 'Get started by creating your first amazing blog post'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreate}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Plus size={20} />
                <span>Create Your First Blog</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}