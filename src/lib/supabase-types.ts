
/**
 * This file contains TypeScript types for your Supabase tables.
 * You should manually update these types to match your Supabase schema.
 */

export interface PersonalInfo {
  id: string; // Typically a UUID generated by Supabase
  name: string;
  title: string; // e.g., "Frontend & Full Stack Developer"
  subtitle?: string | null; // AI Generated
  bio?: string | null; // AI Generated
  position?: string | null; // e.g., "Lead Developer"
  location?: string | null; // e.g., "Kathmandu, Nepal"
  cv_url?: string | null; // URL to the CV PDF in Supabase Storage
  contact_email: string;
  phone?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  personal_info_id: string;
  degree: string;
  institution: string;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  personal_info_id: string;
  job_title: string;
  company: string;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  personal_info_id: string;
  title: string;
  description?: string | null;
  date_achieved?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Certification {
  id: string;
  personal_info_id: string;
  name: string;
  issuing_organization: string;
  issue_date?: string | null;
  expiration_date?: string | null;
  credential_id?: string | null;
  credential_url?: string | null;
  certificate_pdf_url?: string | null; // URL to PDF in Supabase Storage
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string; // e.g., "Frontend Development"
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  skill_category_id: string; // Foreign key to skill_categories
  name: string; // e.g., "ReactJS"
  level?: 'Basic' | 'Intermediate' | 'Expert' | null; // e.g., "Expert", "Intermediate"
  created_at?: string;
  updated_at?: string;
}

export type SkillCategoryWithSkills = SkillCategory & {
  skills: Skill[];
};

export type ProjectType = 'personal' | 'professional_freelance' | 'professional_employment';

export interface Project {
  id: string;
  personal_info_id: string; // Foreign key to personal_info table
  title: string;
  description: string;
  long_description?: string | null;
  technologies: string[] | null; // Array of text
  cover_image_url?: string | null; // URL to image in Supabase Storage
  live_link?: string | null;
  github_link?: string | null;
  project_type: ProjectType;
  category_tags: string[] | null; // Array of text, e.g., ["FinTech", "E-commerce"]
  created_at: string;
  updated_at: string;
}

export interface Post {
    id: string;
    personal_info_id: string;
    title: string;
    slug: string;
    content: string;
    snippet?: string | null;
    tags: string[] | null;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  submitted_at: string; // Timestamp with timezone
}

// You might also want a table for generic site settings if needed
export interface SiteSettings {
  id: string; // Could be a single row table, e.g., id = 'global_settings'
  site_title?: string | null;
  // Add other global settings here
  updated_at?: string;
}
