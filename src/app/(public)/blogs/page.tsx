// app/blogs/page.tsx
import BlogCard from '@/app/components/modules/Blogs/BlogCard';
import { blogAPI } from '@/lib/api';

import { Blog } from '@/types';

import { Search } from 'lucide-react';

async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await blogAPI.getAll();
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
     
      <div className="pt-16">
        <div className="section-padding">
          <div className="container-custom">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Thoughts, tutorials, and insights about web development, technology, and programming
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Blog Grid */}
            {blogs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No blog posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Check back later for new content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
 
    </div>
  );
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds