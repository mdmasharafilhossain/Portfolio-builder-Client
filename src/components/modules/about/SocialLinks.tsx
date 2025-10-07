'use client';
import { SocialLink } from '@/types';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

export default function SocialLinks({ socialLinks }: { socialLinks: SocialLink[] }) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={22} />;
      case 'linkedin': return <Linkedin size={22} />;
      case 'twitter': return <Twitter size={22} />;
      default: return <Globe size={22} />;
    }
  };

  return (
    <div className="flex space-x-3">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 text-gray-600 dark:text-gray-400 hover:text-[#3E1E68] dark:hover:text-[#8B5FBF] border border-gray-200 dark:border-gray-800 hover:border-[#3E1E68]/20"
          aria-label={social.platform}
        >
          {getIcon(social.platform)}
        </a>
      ))}
    </div>
  );
}
