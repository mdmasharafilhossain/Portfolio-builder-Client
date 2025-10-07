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