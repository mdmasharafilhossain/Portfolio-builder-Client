/* eslint-disable @typescript-eslint/no-unused-vars */

import { Calendar, User, ArrowLeft, Share2, Clock, BookOpen, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { blogAPI } from '@/lib/api';
import { Blog } from '@/types';

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const response = await blogAPI.getBySlug(slug);
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; 
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
        <div className="pt-32 section-padding">
          <div className="container-custom text-center max-w-2xl mx-auto">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-[#3E1E68]/10 to-[#5D2F77]/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-[#5D2F77]" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Post Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              The blog post you are looking for seems to have wandered off. Let get you back to amazing content.
            </p>
            <Link 
              href="/blogs" 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={18} />
              <span>Back to Blogs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="pt-16 relative z-10">
        <article className="container-custom max-w-4xl mx-auto py-6 px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center space-x-2 group text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#3E1E68] group-hover:text-white transition-all duration-200">
                <ArrowLeft size={16} />
              </div>
              <span className="font-medium">Back to Blogs</span>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] font-medium rounded-full border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 text-xs transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Author & Meta Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300 block text-sm">{blog.author.name}</span>
                  <span className="text-xs">Author</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-[#5D2F77]" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-[#3E1E68]" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                   5 min read
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="mb-8 relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-xl blur-lg opacity-10"></div>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={800}
                    height={400}
                    className="w-full h-48 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                </div>
              </div>
            )}
          </header>

          {/* Content */}
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3E1E68] to-[#5D2F77] rounded-full hidden md:block"></div>
            
            <div 
              className="
                prose prose-base dark:prose-invert 
                prose-headings:font-bold
                prose-h2:text-2xl prose-h2:text-[#3E1E68] prose-h2:dark:text-[#8B5FBF]
                prose-h3:text-xl prose-h3:text-[#3E1E68] prose-h3:dark:text-[#8B5FBF]
                prose-a:text-[#5D2F77] prose-a:dark:text-[#8B5FBF] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#3E1E68] prose-strong:dark:text-[#8B5FBF]
                prose-blockquote:border-l-[#5D2F77] prose-blockquote:bg-gradient-to-r prose-blockquote:from-[#F8F5FF] prose-blockquote:to-[#EDE7F6] prose-blockquote:dark:from-[#3E1E68]/10 prose-blockquote:dark:to-[#5D2F77]/10
                prose-code:text-[#3E1E68] prose-code:dark:text-[#8B5FBF]
                max-w-none
                bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
                rounded-2xl
                p-6 md:p-8
                border border-gray-100 dark:border-gray-800
                shadow-lg
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          
        </article>
      </div>
    </div>
  );
}

export const revalidate = 60;