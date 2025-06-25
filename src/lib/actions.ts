
'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import type { PersonalInfo, Project, SkillCategoryWithSkills, Skill, SkillCategory } from './supabase-types';
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
    name: z.string().min(1, 'Name is required'),
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
