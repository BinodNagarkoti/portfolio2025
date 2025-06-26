
'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import type { PersonalInfo, Project, SkillCategoryWithSkills, Skill, SkillCategory, Experience, Education, Post } from './supabase-types';
import { z } from 'zod';

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  noStore();
  const supabase = createSupabaseServerClient()
  
  const { data, error } = await supabase.from('personal_info').select('*').limit(1).single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      console.log('No personal info found in database. This is expected if it has not been set yet.');
      return null;
    }
    console.error('Database Error: Failed to Fetch Personal Info.', error);
    return null;
  }

  return data;
}


// Schema for project form validation
const ProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  long_description: z.string().optional(),
  technologies: z.string().optional(),
  cover_image_url: z.string().optional(),
  live_link: z.string().url().optional().or(z.literal('')),
  github_link: z.string().url().optional().or(z.literal('')),
  project_type: z.enum(['personal', 'professional_freelance', 'professional_employment']),
  category_tags: z.string().optional(),
});


export async function getProjects(): Promise<{ data: Project[] | null, error: string | null }> {
  noStore();
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database Error: Failed to Fetch Projects.', error);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export async function getProjectsForAdmin(): Promise<{ data: Project[] | null, error: string | null }> {
    noStore(); // Add noStore to prevent caching
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Database Error: Failed to Fetch Projects for Admin.', error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}

export async function upsertProject(formData: FormData): Promise<{ data: Project | null, error: string | null }> {
    const supabase = createSupabaseServerClient();
    const personalInfo = await getPersonalInfo();
    
    if (!personalInfo) {
      return { data: null, error: 'Could not find personal info to associate project with.' };
    }

    const rawFormData = Object.fromEntries(formData.entries());
    
    const validatedFields = ProjectSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
      console.error('Form validation error:', validatedFields.error.flatten().fieldErrors);
      return { data: null, error: 'Invalid form data.' };
    }

    let coverImageUrl = validatedFields.data.cover_image_url || null;
    const imageFile = formData.get('cover_image') as File | null;

    if (imageFile && imageFile.size > 0) {
      const fileName = `${personalInfo.id}/${Date.now()}_${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('projects') // Assuming 'projects' is your storage bucket name
        .upload(fileName, imageFile, { upsert: true });

      if (uploadError) {
        console.error('Storage Error:', uploadError);
        return { data: null, error: 'Failed to upload image.' };
      }
      
      const { data: urlData } = supabase.storage.from('projects').getPublicUrl(uploadData.path);
      coverImageUrl = urlData.publicUrl;
    }
    
    const stringToArray = (str: string | undefined) => str ? str.split(',').map(item => item.trim()).filter(Boolean) : [];

    const dataToUpsert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & { id?: string } = {
        ...validatedFields.data,
        personal_info_id: personalInfo.id,
        technologies: stringToArray(validatedFields.data.technologies),
        category_tags: stringToArray(validatedFields.data.category_tags),
        cover_image_url: coverImageUrl,
    };
    
    // If no ID, it's an insert. If ID exists, it's an update.
    if(!validatedFields.data.id) {
        delete dataToUpsert.id;
    }
    
    const { data, error } = await supabase
        .from('projects')
        .upsert(dataToUpsert)
        .select()
        .single();
    
    if (error) {
        console.error('Database Upsert Error:', error);
        return { data: null, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/projects');

    return { data, error: null };
}

export async function deleteProject(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();

    // Also delete image from storage
    const { data: projectData, error: fetchError } = await supabase.from('projects').select('cover_image_url').eq('id', id).single();
    if (fetchError) {
        console.error('Could not fetch project to delete image:', fetchError);
    }
    if (projectData?.cover_image_url) {
        const path = new URL(projectData.cover_image_url).pathname.split('/projects/').pop();
        if (path) {
            await supabase.storage.from('projects').remove([path]);
        }
    }

    const { error } = await supabase.from('projects').delete().match({ id });

    if (error) {
        console.error('Database Delete Error:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/projects');

    return { error: null };
}

// SKILLS ACTIONS
export async function getSkillCategoriesWithSkills(): Promise<{ data: SkillCategoryWithSkills[] | null, error: string | null }> {
    noStore();
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('skill_categories')
        .select('*, skills (*, skill_categories (name))')
        .order('name', { ascending: true });

    if (error) {
        console.error('Database Error: Failed to Fetch Skill Categories.', error);
        return { data: null, error: error.message };
    }

    return { data, error: null };
}


const SkillCategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
});

export async function upsertSkillCategory(categoryData: { id?: string, name: string }): Promise<{ data: SkillCategory | null, error: string | null }> {
    const validatedFields = SkillCategorySchema.safeParse(categoryData);
    if (!validatedFields.success) {
        return { data: null, error: 'Invalid category data.' };
    }
    
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('skill_categories').upsert(validatedFields.data).select().single();
    
    if (error) return { data: null, error: error.message };
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
    return { data, error: null };
}

export async function deleteSkillCategory(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('skill_categories').delete().match({ id });
    if (error) return { error: error.message };
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
    return { error: null };
}


const SkillSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Skill name is required'),
    level: z.string().nullable(),
    skill_category_id: z.string(),
});

export async function upsertSkill(skillData: { id?: string, name: string, level: string | null, skill_category_id: string }): Promise<{ data: Skill | null, error: string | null }> {
    const validatedFields = SkillSchema.safeParse(skillData);
    if (!validatedFields.success) {
        return { data: null, error: 'Invalid skill data.' };
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('skills').upsert(validatedFields.data).select().single();

    if (error) return { data: null, error: error.message };
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
    return { data, error: null };
}

export async function deleteSkill(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('skills').delete().match({ id });
    if (error) return { error: error.message };
    revalidatePath('/admin/dashboard/skills');
    revalidatePath('/');
    return { error: null };
}

// EXPERIENCE ACTIONS
export async function getExperience(): Promise<{ data: Experience[] | null, error: string | null }> {
    noStore();
    const personalInfo = await getPersonalInfo();
    if (!personalInfo) {
      return { data: [], error: null };
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('experience')
        .select('*')
        .eq('personal_info_id', personalInfo.id)
        .order('start_date', { ascending: false });

    if (error) {
        console.error('Database Error: Failed to Fetch Experience.', error);
        return { data: null, error: error.message };
    }
    return { data, error: null };
}

const ExperienceSchema = z.object({
    id: z.string().optional(),
    job_title: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().optional(),
    description: z.string().optional(),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().nullable().optional(),
});

export async function upsertExperience(formData: { id?: string, [key: string]: any }): Promise<{ data: Experience | null, error: string | null }> {
    const validatedFields = ExperienceSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.error('Form validation error:', validatedFields.error.flatten().fieldErrors);
        return { data: null, error: 'Invalid form data.' };
    }

    const supabase = createSupabaseServerClient();
    const { data: personalInfo } = await supabase.from('personal_info').select('id').single();

    if (!personalInfo) {
        return { data: null, error: 'Personal info not found.' };
    }

    const dataToUpsert = {
        ...validatedFields.data,
        personal_info_id: personalInfo.id,
    };
    
    const { data, error } = await supabase.from('experience').upsert(dataToUpsert).select().single();

    if (error) {
        console.error('Database Upsert Error:', error);
        return { data: null, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/experience');

    return { data, error: null };
}

export async function deleteExperience(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('experience').delete().match({ id });

    if (error) {
        console.error('Database Delete Error:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/experience');

    return { error: null };
}

// EDUCATION ACTIONS
export async function getEducation(): Promise<{ data: Education[] | null, error: string | null }> {
    noStore();
    const personalInfo = await getPersonalInfo();
    if (!personalInfo) {
      return { data: [], error: null };
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('personal_info_id', personalInfo.id)
        .order('start_date', { ascending: false });

    if (error) {
        console.error('Database Error: Failed to Fetch Education.', error.message);
        return { data: null, error: error.message };
    }
    return { data, error: null };
}

const EducationSchema = z.object({
    id: z.string().optional(),
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    location: z.string().optional(),
    description: z.string().optional(),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().nullable().optional(),
});

export async function upsertEducation(formData: { id?: string, [key: string]: any }): Promise<{ data: Education | null, error: string | null }> {
    const validatedFields = EducationSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.error('Form validation error:', validatedFields.error.flatten().fieldErrors);
        return { data: null, error: 'Invalid form data.' };
    }

    const supabase = createSupabaseServerClient();
    const { data: personalInfo } = await supabase.from('personal_info').select('id').single();

    if (!personalInfo) {
        return { data: null, error: 'Personal info not found.' };
    }

    const dataToUpsert = {
        ...validatedFields.data,
        personal_info_id: personalInfo.id,
    };

    const { data, error } = await supabase.from('education').upsert(dataToUpsert).select().single();

    if (error) {
        console.error('Database Upsert Error:', error);
        return { data: null, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/education');

    return { data, error: null };
}

export async function deleteEducation(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('education').delete().match({ id });

    if (error) {
        console.error('Database Delete Error:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/education');

    return { error: null };
}

// POSTS (BLOG) ACTIONS
export async function getPosts(): Promise<{ data: Post[] | null, error: string | null }> {
    noStore();
    const personalInfo = await getPersonalInfo();
    if (!personalInfo) {
        return { data: [], error: null };
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('personal_info_id', personalInfo.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Database Error: Failed to Fetch Posts.', error.message);
        return { data: null, error: error.message };
    }
    return { data, error: null };
}

const PostSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    tags: z.string().optional(),
});

export async function upsertPost(formData: { id?: string, [key: string]: any }): Promise<{ data: Post | null, error: string | null }> {
    const validatedFields = PostSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.error('Form validation error:', validatedFields.error.flatten().fieldErrors);
        return { data: null, error: 'Invalid form data.' };
    }

    const supabase = createSupabaseServerClient();
    const personalInfo = await getPersonalInfo();

    if (!personalInfo) {
        return { data: null, error: 'Personal info not found.' };
    }
    
    const stringToArray = (str: string | undefined) => str ? str.split(',').map(item => item.trim()).filter(Boolean) : [];
    const snippet = validatedFields.data.content.substring(0, 150) + (validatedFields.data.content.length > 150 ? '...' : '');

    const dataToUpsert = {
        ...validatedFields.data,
        personal_info_id: personalInfo.id,
        tags: stringToArray(validatedFields.data.tags),
        snippet,
        published_at: new Date().toISOString(), // Or handle publishing state separately
    };
    
    const { data, error } = await supabase.from('posts').upsert(dataToUpsert).select().single();

    if (error) {
        console.error('Database Upsert Error:', error);
        return { data: null, error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/blog');

    return { data, error: null };
}

export async function deletePost(id: string): Promise<{ error: string | null }> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('posts').delete().match({ id });

    if (error) {
        console.error('Database Delete Error:', error);
        return { error: error.message };
    }

    revalidatePath('/');
    revalidatePath('/admin/dashboard/blog');

    return { error: null };
}
