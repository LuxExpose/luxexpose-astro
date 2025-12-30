const SUPABASE_URL = "https://ppmdgygupuzthqxfippv.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4";

export interface Location {
  id: string;
  name: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  hero_image?: string;
}

export async function fetchLocationIdBySlug(slug: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/locations?slug=eq.${slug}&select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (response.ok) {
      const locations = await response.json();
      return locations?.[0]?.id || null;
    }
  } catch (error) {
    console.error(`Error fetching location_id for slug ${slug}:`, error);
  }

  return null;
}

export async function fetchLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/locations?slug=eq.${slug}&select=*&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (response.ok) {
      const locations = await response.json();
      return locations?.[0] || null;
    }
  } catch (error) {
    console.error(`Error fetching location for slug ${slug}:`, error);
  }

  return null;
}

