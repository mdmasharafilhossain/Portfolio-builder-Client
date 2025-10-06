'use client';
import { Skill } from '@/types';

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-800 dark:text-white text-sm">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-[#3E1E68] dark:text-[#8B5FBF]">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-[#3E1E68] to-[#5D2F77] h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}
