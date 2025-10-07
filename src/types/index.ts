/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
  updatedAt?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  published: boolean;
  authorId: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface About {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  experiences: Experience[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  count?: number;
}

export interface BlogCardProps {
  blog: Blog;
}
export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}
export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  error?: string;
  ref?:string
}

export type BlogFormData = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl: string;
  tags?: string;
  published: boolean;
};

export interface BlogEditorProps {
  blog?: Blog | null;
  onSave: (blog: Blog) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}