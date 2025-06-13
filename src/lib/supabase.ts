import { createClient } from '@supabase/supabase-js';

// Expose the Supabase project URL so other modules can build REST and Edge
// Function endpoints based on it.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Central Supabase client used across the app
export const supabase = createClient(SUPABASE_URL, supabaseAnonKey);