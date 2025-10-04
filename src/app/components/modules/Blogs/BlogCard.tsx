
import { BlogCardProps } from '@/types';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import Image from 'next/image';


const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="card overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
      {blog.imageUrl && (
        <div className="h-48 overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{blog.author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          <span>Read More</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;