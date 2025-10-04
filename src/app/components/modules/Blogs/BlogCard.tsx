import { BlogCardProps } from '@/types';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
 
  // Premium Card Design
  const cardClasses = `
    overflow-hidden
    bg-white dark:bg-gray-900
    rounded-2xl
    shadow-lg hover:shadow-2xl
    group
    transition-all duration-500
    hover:scale-[1.02]
    border border-gray-100 dark:border-gray-800
    flex flex-col
    h-full
    relative
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-[#3E1E68]/5 before:opacity-0 before:transition-opacity before:duration-500
    hover:before:opacity-100
  `;

  return (
    <article className={cardClasses}>
      {/* Image Container with Gradient Overlay */}
      {blog?.imageUrl && (
        <div className="h-48 md:h-56 overflow-hidden relative w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src={blog?.imageUrl || 'https://i.ibb.co.com/99dfPr1C/noimage.png'}
            alt={blog?.title}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
            className="
              object-cover
              group-hover:scale-110
              transition-transform duration-700 ease-out
            "
          />
          
          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Clock size={14} className="text-[#5D2F77]" />
              <span className="text-xs font-medium text-[#3E1E68] dark:text-[#8B5FBF]">
                5 min read
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-20 bg-white dark:bg-gray-900">
        
        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`
                px-3 py-1.5 text-xs font-semibold rounded-full
                bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] 
                text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF]
                border border-[#3E1E68]/10 dark:border-[#5D2F77]/20
                transition-all duration-300 hover:scale-105 hover:shadow-md
                backdrop-blur-sm
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Enhanced Title with Gradient Text */}
        <h3 
          className={`
            text-xl sm:text-2xl font-bold mb-4
            bg-gradient-to-r from-gray-900 to-[#3E1E68] dark:from-white dark:to-[#8B5FBF]
            bg-clip-text text-transparent
            line-clamp-2
            group-hover:from-[#5D2F77] group-hover:to-[#8B5FBF]
            transition-all duration-500
            leading-tight
          `}
        >
          {blog.title}
        </h3>

        {/* Enhanced Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm sm:text-base">
          {blog.excerpt}
        </p>

        {/* Enhanced Metadata */}
        <div className="
          flex flex-wrap justify-between items-center text-sm
          text-gray-500 dark:text-gray-400 
          border-t border-gray-100 dark:border-gray-800 pt-4
          mt-auto gap-3
        ">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{blog.author.name}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
            <Calendar size={16} className="text-[#5D2F77]" />
            <span className="font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        {/* Enhanced Read More Link */}
        <Link
          href={`/blogs/${blog.slug}`}
          className={`
            mt-6 inline-flex items-center space-x-3
            group-hover:bg-gradient-to-r group-hover:from-[#3E1E68] group-hover:to-[#5D2F77]
            bg-gray-50 dark:bg-gray-800
            text-[#3E1E68] dark:text-[#8B5FBF] 
            group-hover:text-white
            font-semibold
            transition-all duration-300
            w-full justify-center
            px-4 py-3
            rounded-xl
            border border-gray-200 dark:border-gray-700
            group-hover:border-transparent
            group-hover:shadow-lg
          `}
        >
          <span className="text-sm">Continue Reading</span>
          <div className="
            w-6 h-6 rounded-full bg-[#3E1E68]/10 dark:bg-[#8B5FBF]/20 
            group-hover:bg-white/20
            flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110
          ">
            <ArrowRight 
              size={14} 
              className="
                transition-transform duration-300 
                group-hover:translate-x-0.5
              " 
            />
          </div>
        </Link>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3E1E68]/0 via-[#5D2F77]/0 to-[#8B5FBF]/0 group-hover:via-[#5D2F77]/5 group-hover:to-[#8B5FBF]/10 transition-all duration-500 pointer-events-none" />
    </article>
  );
};

export default BlogCard;