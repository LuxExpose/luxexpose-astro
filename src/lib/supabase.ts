import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL missing. Check Vercel Environment Variables.");
}

if (!supabaseAnonKey) {
  throw new Error("SUPABASE_ANON_KEY missing. Check Vercel Environment Variables.");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);