// app/blogs/page.tsx
import BlogCard from '@/app/components/modules/Blogs/BlogCard';
import { blogAPI } from '@/lib/api';

import { Blog } from '@/types';

import { Search } from 'lucide-react'; // Added ChevronDown for potential filtering

// Brand Colors (using custom classes for Tailwind CSS look-alike structure)
const BRAND_PRIMARY = 'text-[#3E1E68]'; 
const BRAND_SECONDARY = 'text-[#5D2F77]';


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
    <div className="min-h-screen bg-white dark:bg-gray-950 px-5 md:px-10 lg:px-10">
      
      {/* Container with top padding */}
      <div className="pt-10 pb-16 md:pt-32 md:pb-24">
        <div className="section-padding">
          <div className="container mx-auto"> 
            {/* Header - More refined typography and color accents */}
            <div className="text-center mb-16">
              <p className={`text-sm font-semibold uppercase tracking-widest ${BRAND_SECONDARY} mb-2`}>
                Latest Insights
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                Our <span className={BRAND_PRIMARY}>Blog</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Thoughts, tutorials, and insights about web development, technology, and programming.
              </p>
            </div>

           

            {/* Blog Grid */}
            {blogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog) => (
                  // Assuming BlogCard handles responsiveness for itself (which it does)
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              // No Blogs State - Updated colors and design
              <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl mx-auto max-w-lg">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Search size={40} className="mx-auto text-gray-300 dark:text-gray-700" />
                </div>
                <h3 className={`text-xl font-medium ${BRAND_PRIMARY} mb-2`}>
                  No blog posts found
                </h3>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60; 