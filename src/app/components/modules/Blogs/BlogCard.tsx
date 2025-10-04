import { BlogCardProps } from '@/types';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Brand Colors (assuming these are in your tailwind config as primary, but using hex for certainty)
  const PRIMARY_TEXT = 'text-[#3E1E68]'; // Darker color for emphasis
  const SECONDARY_ACCENT_TEXT = 'text-[#5D2F77]'; // Lighter color for hover/secondary elements

  // Professional and Responsive Card Classes
  const cardClasses = `
    overflow-hidden
    bg-white dark:bg-gray-900
    rounded-xl
    shadow-lg hover:shadow-2xl
    group
    transition-all duration-300
    hover:scale-[1.015] // Subtle scale for professional feel
    border border-gray-100 dark:border-gray-800
    flex flex-col // Ensure the content stretches and stacks properly
    h-full // Makes it easy to use in responsive grids
  `;

  return (
    <article className={cardClasses}>
      {/* 1. Responsive Image Section */}
      {blog.imageUrl && (
        <div className="h-48 md:h-56 overflow-hidden relative w-full"> {/* Adjust height responsively */}
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill={true} // Use fill for better responsive control in Next.js Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
            className="
              object-cover
              group-hover:scale-110
              transition-transform duration-500 ease-in-out
            "
          />
        </div>
      )}

      {/* 2. Content Area - Stacks Vertically */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className={`
                px-3 py-1 text-xs font-medium rounded-full
                bg-purple-100 ${PRIMARY_TEXT} dark:bg-[#5D2F77]/30 dark:text-[#5D2F77]
                whitespace-nowrap // Prevents tags from breaking awkwardly
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 
          className={`
            text-xl sm:text-2xl font-bold mb-3
            text-gray-900 dark:text-white line-clamp-2
            group-hover:${SECONDARY_ACCENT_TEXT}
            transition-colors
          `}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
          {blog.excerpt}
        </p>

        {/* Metadata (Author & Date) - Flex container ensures good layout on small screens */}
        <div className="
          flex flex-wrap justify-between items-center text-xs sm:text-sm 
          text-gray-500 dark:text-gray-400 
          border-t border-gray-100 dark:border-gray-800 pt-3 sm:pt-4 
          mt-auto gap-2
        ">
          <div className="flex items-center space-x-2">
            <User size={16} className={PRIMARY_TEXT} /> 
            <span className="font-medium text-gray-700 dark:text-gray-300">{blog.author.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} className={SECONDARY_ACCENT_TEXT} />
            <span className="whitespace-nowrap">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
        
        {/* Read More Link */}
        <Link
          href={`/blogs/${blog.slug}`}
          className={`
            mt-4 inline-flex items-center space-x-2
            ${PRIMARY_TEXT} hover:text-[#5D2F77] 
            font-semibold
            transition-colors duration-200
            w-max
          `}
        >
          <span>Read More</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;