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
      // Try multiple possible field names for image URL
      // Database might use: image_url, image, imageUrl, hero_image, etc.
      const imageUrl = item.image_url 
        || item.image 
        || item.hero_image_url 
        || item.hero_image
        || item.imageUrl
        || '';
      
      // Debug: Log what we found for each neighborhood
      if (import.meta.env.DEV) {
        console.log(`[Neighborhoods] ${item.name}:`, {
          image_url: item.image_url || 'NOT FOUND',
          image: item.image || 'NOT FOUND',
          hero_image_url: item.hero_image_url || 'NOT FOUND',
          hero_image: item.hero_image || 'NOT FOUND',
          final_imageUrl: imageUrl || 'EMPTY',
          allKeys: Object.keys(item)
        })
      }
      
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || '',
        image_url: imageUrl,
        hero_image_url: item.hero_image_url || item.hero_image || '',
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

