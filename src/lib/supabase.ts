import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface AssessmentRecord {
  id: string;
  user_id: string;
  created_at: string;
  craft_score: number;
  organization_score: number;
  profile: string;
  reflection: string | null;
  public_id: string | null;
}

export interface AssessmentAnswerRecord {
  id: string;
  assessment_id: string;
  question_id: number;
  answer_id: string;
}
