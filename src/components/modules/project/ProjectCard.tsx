"use client";
import { ProjectCardProps } from '@/types';
import Link from 'next/link';
import { ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';



const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
    
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-[#F8F5FF] to-[#EDE7F6] dark:from-[#1a1033] dark:to-[#2d1b4e]">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] flex items-center justify-center">
            <span className="text-white text-xl font-bold text-center px-6">
              {project.title}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={22} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={22} />
            </a>
          )}
        </div>
        
       
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg">
            <Star size={14} fill="currentColor" />
            <span>Featured</span>
          </div>
        )}
      </div>
      
    
      <div className="p-6 md:p-7">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#5D2F77] dark:group-hover:text-[#8B5FBF] transition-colors duration-300 cursor-pointer leading-tight">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed text-sm md:text-base">
          {project.description}
        </p>
        
     
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] text-xs font-semibold rounded-full border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
      
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#5D2F77] hover:text-[#3E1E68] dark:text-[#8B5FBF] dark:hover:text-[#A67FCF] transition-all duration-300 hover:scale-105 text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          
          
        </div>
      </div>

    
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10" />
    </div>
  );
};

export default ProjectCard;