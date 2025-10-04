// app/blogs/page.tsx
import BlogCard from '@/app/components/modules/Blogs/BlogCard';
import { blogAPI } from '@/lib/api';
import { Blog } from '@/types';
import { Search, Sparkles, BookOpen } from 'lucide-react';

// Enhanced Brand Colors with gradients
const BRAND_PRIMARY = 'text-[#3E1E68]';
const BRAND_SECONDARY = 'text-[#5D2F77]';
const BRAND_GRADIENT = 'bg-gradient-to-r from-[#3E1E68] to-[#5D2F77]';

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
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8F5FF] to-white dark:from-gray-950 dark:via-[#1a1033] dark:to-gray-950 px-5 md:px-10 lg:px-10">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#3E1E68]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5D2F77]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Container with top padding */}
      <div className="pt-10 pb-16 md:pt-32 md:pb-24 relative z-10">
        <div className="section-padding">
          <div className="container mx-auto max-w-7xl"> 
            
            {/* Enhanced Header Section */}
            <div className="text-center mb-20 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-gradient-to-r from-[#3E1E68]/10 to-[#5D2F77]/10 rounded-full blur-xl"></div>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-lg blur opacity-30"></div>
                  <div className="relative bg-white dark:bg-gray-900 px-6 py-3 rounded-lg border border-gray-100 dark:border-gray-800 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#5D2F77]" />
                      <p className={`text-sm font-semibold uppercase tracking-widest ${BRAND_SECONDARY}`}>
                        Latest Insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">Blog</span>
              </h1>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Discover thought-provoking articles, cutting-edge tutorials, and expert insights about web development, technology, and programming.
                </p>
                
                {/* Stats Bar */}
                <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-[#3E1E68]" />
                    <span>{blogs.length} Articles</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full animate-pulse"></div>
                    <span>Updated Regularly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid Section */}
            {blogs.length > 0 ? (
              <div className="relative">
                {/* Grid Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3E1E68]/5 to-transparent rounded-3xl -z-10"></div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog, index) => (
                    <div 
                      key={blog.id}
                      className="transform transition-all duration-500 hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <BlogCard key={blog?.id} blog={blog} />
                    </div>
                  ))}
                </div>

                {/* Floating CTA */}
                <div className="text-center mt-16">
                  <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-[#5D2F77] rounded-full animate-bounce"></div>
                    <span className="text-sm font-medium">Scroll for more amazing content</span>
                  </div>
                </div>
              </div>
            ) : (
              // Enhanced No Blogs State
              <div className="text-center py-24 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl mx-auto max-w-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full blur-lg opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-full border border-gray-100 dark:border-gray-800 shadow-lg">
                    <Search size={48} className="text-gray-300 dark:text-gray-700" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold ${BRAND_PRIMARY} mb-3`}>
                  No blog posts found
                </h3>
               
                <div className="w-24 h-1 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] rounded-full mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </div>
  );
}

export const revalidate = 60;