import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required').max(16, 'Maximum Length Crossed')
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.string().optional(),
  published: z.boolean().default(true),
}).transform((data) => ({
  ...data,
  published: data.published ?? true,
}));

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(78, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
    longDescription: z.string().min(1, 'Long description is required'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  projectUrl: z.string().url('Project URL must be valid').optional().or(z.literal('')),
  githubUrl: z.string().url('GitHub URL must be valid').optional().or(z.literal('')),
  liveUrl: z.string().url('Live Demo URL must be valid').optional().or(z.literal('')),
  featured: z.boolean(),
  imageUrl: z.string().url('Image URL must be valid').optional().or(z.literal('')),
});


export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().min(1, 'Icon is required')
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(0).max(100, 'Level must be between 0 and 100'),
  category: z.string().min(1, 'Category is required')
});

export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  current: z.boolean().default(false),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).default([])
});

export const aboutFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long'),
  
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title too long'),
  
  bio: z.string()
    .min(1, 'Bio is required')
    .max(2000, 'Bio too long'),
  
  email: z.string()
    .email('Invalid email address'),

  phone: z.string()
    .optional()
    .nullable()
    .or(z.literal('')), // allows empty string for form inputs
  
  location: z.string()
    .optional()
    .nullable()
    .or(z.literal('')),
  
  avatarUrl: z.string()
    .url('Invalid URL')
    .optional()
    .nullable()
    .or(z.literal('')), // allows blank URL
  
  resumeUrl: z.string()
    .url('Invalid URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  
  socialLinks: z.array(socialLinkSchema).default([]),
  skills: z.array(skillSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
});

export type AboutFormData = z.infer<typeof aboutFormSchema>;



