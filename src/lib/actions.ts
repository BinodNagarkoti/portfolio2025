'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { unstable_noStore as noStore } from 'next/cache';
import type { PersonalInfo } from './supabase-types';

export async function getPersonalInfo(): Promise<PersonalInfo | null> {
  noStore();
  const supabase = createSupabaseServerClient()
  
  // There should only be one row in personal_info, which we'll treat as the source of truth.
  const { data, error } = await supabase.from('personal_info').select('*').limit(1).single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // This happens when the table is empty. It's not a "real" error in our case.
      console.log('No personal info found in database. This is expected if it has not been set yet.');
      return null;
    }
    console.error('Database Error: Failed to Fetch Personal Info.', error);
    return null;
  }

  return data;
}
