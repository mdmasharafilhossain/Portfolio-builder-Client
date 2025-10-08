/* eslint-disable @typescript-eslint/no-empty-object-type */
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

// export interface About {
//   id: string;
//   name: string;
//   title: string;
//   bio: string;
//   email: string;
//   phone?: string | null;
//   location?: string | null;
//   avatarUrl?: string | null;
//   resumeUrl?: string | null;
//   socialLinks: SocialLink[];
//   skills: Skill[];
//   experiences: Experience[];
// }


// export interface SocialLink {
  
//   platform: string;
//   url: string;
//   icon: string;
// }

// export interface Skill {
//   name: string;
//   level: number;
//   category: string;
// }

// export interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   startDate: string;
//   endDate?: string;
//   current: boolean;
//   description: string;
//   technologies: string[];
// }

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

export interface ProjectEditorProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export  interface ProjectCardPropsAgain {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string, title: string) => void;
  onToggleFeatured: (project: Project) => void;
}

export interface SocialLinkField {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface SkillField {
  id: string;
  name: string;
  category: string;
  level: number;
}



// export interface SocialLink {
//   id: string;
//   platform: string;
//   url: string;
//   icon: string;
// }

// export interface Skill {
//   id: string;
//   name: string;
//   level: number;
//   category: string;
// }

// export interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   startDate: string;
//   endDate?: string;
//   current: boolean;
//   description: string;
//   technologies: string[];
// }



// Extraaa

export interface SocialLink {
  id?: string; // optional
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  id?: string; // optional
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id?: string; // optional
  company: string;
  position: string;
  startDate: string; // string for form input
  endDate?: string | null; // optional string
  current: boolean;
  description: string;
  technologies: string[];
}

export interface About {
  id?: string; // optional for form
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  socialLinks: SocialLink[];
  skills: Skill[];
  experiences: Experience[];
}


