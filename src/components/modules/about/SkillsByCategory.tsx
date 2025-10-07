'use client';
import { Skill } from '@/types';
import { Code, Server, Settings } from 'lucide-react';
import SkillBar from './SkillBar';

export default function SkillsByCategory({ skills }: { skills: Skill[] }) {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'frontend': return <Code className="text-[#5D2F77]" size={24} />;
      case 'backend': return <Server className="text-[#5D2F77]" size={24} />;
      default: return <Settings className="text-[#5D2F77]" size={24} />;
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(cat => (
        <div key={cat} className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            {getCategoryIcon(cat)} <span className="ml-3 bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] bg-clip-text text-transparent">{cat}</span>
          </h3>
          <div className="space-y-4">
            {skills.filter(s => s.category === cat).map(s => <SkillBar key={s.name} skill={s} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
