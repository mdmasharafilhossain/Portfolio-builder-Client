'use client';
import { Experience } from '@/types';
import { Building } from 'lucide-react';

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={exp?.id || index} className="relative group">
          {index !== experiences.length - 1 && (
            <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-[#3E1E68] to-[#5D2F77] opacity-60" />
          )}
          <div className="flex space-x-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3E1E68] to-[#5D2F77] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Building className="text-white" size={20} />
              </div>
            </div>
            <div className="flex-1 pb-8">
              <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.position}</h3>
                  <span className="text-[#5D2F77] dark:text-[#8B5FBF] font-semibold bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] dark:from-[#3E1E68]/10 dark:to-[#5D2F77]/10 px-3 py-1 rounded-full text-sm">
                    {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate!).getFullYear()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building size={18} className="text-[#5D2F77] dark:text-[#8B5FBF]" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{exp.company}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gradient-to-r from-[#F8F5FF] to-[#EDE7F6] text-[#3E1E68] dark:from-[#3E1E68]/20 dark:to-[#5D2F77]/20 dark:text-[#8B5FBF] rounded-full text-xs font-semibold border border-[#3E1E68]/10 dark:border-[#5D2F77]/20 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
