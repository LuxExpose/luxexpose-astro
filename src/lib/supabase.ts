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

// Fetch all cities from the locations table
export async function getAllCities() {
  // NOTE: adjust table name/columns if your DB differs
  const { data, error } = await supabase
    .from("locations")
    .select("name, slug")
    .eq("type", "city")
    .order("name", { ascending: true });

  if (error) {
    console.error("getAllCities error:", error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    name: row.name,
    slug: row.slug,
  }));
}
