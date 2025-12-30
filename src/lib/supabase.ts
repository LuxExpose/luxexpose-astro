import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://ppmdgygupuzthqxfippv.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4';

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

export async function getAllCities() {
  const { data, error } = await supabase
    .from("locations")
    .select("name, slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("getAllCities error:", error);
    return [];
  }

  return data ?? [];
}
