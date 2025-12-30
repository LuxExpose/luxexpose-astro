const SUPABASE_URL = "https://ppmdgygupuzthqxfippv.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4";

export interface CityData {
  location: {
    id: string;
    name: string;
    slug: string;
    meta_title?: string;
    meta_description?: string;
    hero_image?: string;
  };
  neighborhoods?: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
  }>;
  stats?: Array<{
    icon: string;
    label: string;
    value: string;
    description?: string;
  }>;
  copy?: {
    hero_tagline?: string;
    heroTagline?: string;
    hero_subtext?: string;
    heroSubtext?: string;
    exploration_headline?: string;
    explorationHeadline?: string;
    exploration_subtext?: string;
    explorationSubtext?: string;
    category_intro?: string;
    categoryIntro?: string;
    experience_callout?: string;
    experienceCallout?: string;
  };
}

export async function fetchCompleteCityData(citySlug: string): Promise<CityData | null> {
  try {
    // Fetch location
    const locationResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/locations?slug=eq.${citySlug}&select=*&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!locationResponse.ok) {
      return null;
    }

    const locations = await locationResponse.json();
    const location = locations?.[0];

    if (!location) {
      return null;
    }

    const locationId = location.id;

    // Fetch neighborhoods
    let neighborhoods = [];
    try {
      const neighborhoodsResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/city_neighborhoods?location_id=eq.${locationId}&select=id,name,slug,description,image_url&order=name.asc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (neighborhoodsResponse.ok) {
        neighborhoods = await neighborhoodsResponse.json() || [];
      }
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    }

    // Fetch stats (if city_stats table exists)
    let stats = [];
    try {
      const statsResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/city_stats?location_id=eq.${locationId}&select=icon,label,value,description&order=order.asc`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (statsResponse.ok) {
        stats = await statsResponse.json() || [];
      }
    } catch (error) {
      // Table might not exist yet
      console.warn("city_stats table not available:", error);
    }

    // Fetch copy (if city_copy table exists)
    let copy = null;
    try {
      const copyResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/city_copy?location_id=eq.${locationId}&select=*&limit=1`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );
      if (copyResponse.ok) {
        const copyData = await copyResponse.json();
        copy = copyData?.[0] || null;
      }
    } catch (error) {
      // Table might not exist yet
      console.warn("city_copy table not available:", error);
    }

    return {
      location,
      neighborhoods: neighborhoods.length > 0 ? neighborhoods : undefined,
      stats: stats.length > 0 ? stats : undefined,
      copy: copy || undefined,
    };
  } catch (error) {
    console.error(`Error fetching city data for ${citySlug}:`, error);
    return null;
  }
}

