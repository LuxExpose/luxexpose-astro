// src/lib/queries/neighborhoods.ts
import { supabase } from '../supabase'

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  hero_image_url?: string;
  gallery_images?: string[];
  stats?: any;
  display_order: number;
  location_id?: string;
}

/**
 * Fetch neighborhoods for a city
 */
export async function getCityNeighborhoods(citySlug: string): Promise<Neighborhood[]> {
  try {
    // First, get the location_id for the city
    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('slug', citySlug)
      .single()

    if (locationError || !locationData) {
      console.error('Error fetching location for neighborhoods:', locationError)
      return []
    }

    // Then fetch neighborhoods for that location
    // Select all fields to see what's actually in the database
    const { data, error } = await supabase
      .from('city_neighborhoods')
      .select('*')
      .eq('location_id', locationData.id)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching neighborhoods:', error)
      return []
    }

    // Debug: Log raw data to see what fields exist
    if (import.meta.env.DEV && data && data.length > 0) {
      console.log('[Neighborhoods Debug] Raw data from database:', JSON.stringify(data[0], null, 2))
    }

    const neighborhoods = (data || []).map((item: any) => {
      // Use image_url, fallback to hero_image_url if image_url is empty
      const imageUrl = item.image_url || item.hero_image_url || '';
      
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || '',
        image_url: imageUrl,
        hero_image_url: item.hero_image_url || '',
        gallery_images: Array.isArray(item.gallery_images) ? item.gallery_images : [],
        stats: item.stats || null,
        display_order: item.display_order || 0,
        location_id: item.location_id || '',
      };
    })

    // Debug: Log neighborhoods with image URLs
    if (import.meta.env.DEV) {
      console.log(`[Neighborhoods] Fetched ${neighborhoods.length} neighborhoods for ${citySlug}:`, 
        neighborhoods.map(n => ({ name: n.name, image_url: n.image_url }))
      )
    }

    return neighborhoods
  } catch (error) {
    console.error('Error in getCityNeighborhoods:', error)
    return []
  }
}

