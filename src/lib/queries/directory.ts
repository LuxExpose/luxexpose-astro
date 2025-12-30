// src/lib/queries/directory.ts
import { supabase } from '../supabase'

export interface DirectoryListing {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_range: string;
  featured_image: string;
  short_description?: string;
  description?: string;
  neighborhood?: string;
  address: string;
  rating_average: number;
  review_count: number;
  view_count?: number;
  is_featured: boolean;
  is_verified: boolean;
  features?: string[];
  phone?: string;
  website?: string;
}

/**
 * Fetch featured directory listings for a city
 */
export async function fetchFeaturedDirectoryListings(
  citySlug: string,
  limit: number = 6
): Promise<DirectoryListing[]> {
  try {
    const { data, error } = await supabase
      .from('local_directory')
      .select(`
        id,
        slug,
        name,
        category,
        featured_image,
        is_featured,
        is_verified,
        neighborhood,
        price_range,
        rating_average,
        review_count,
        view_count,
        short_description,
        description,
        address,
        phone,
        website,
        features
      `)
      .eq('city', citySlug)
      .eq('is_featured', true)
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured directory listings:', error)
      return []
    }

    // Map the data to our interface format
    return (data || []).map((item: any) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      category: item.category || 'Uncategorized',
      price_range: item.price_range || '$$$',
      featured_image: item.featured_image || '',
      short_description: item.short_description || item.description || '',
      description: item.description || '',
      neighborhood: item.neighborhood || '',
      address: item.address || '',
      rating_average: item.rating_average || 0,
      review_count: item.review_count || 0,
      view_count: item.view_count || 0,
      is_featured: item.is_featured || false,
      is_verified: item.is_verified || false,
      features: Array.isArray(item.features) ? item.features : [],
      phone: item.phone || '',
      website: item.website || '',
    }))
  } catch (error) {
    console.error('Error in fetchFeaturedDirectoryListings:', error)
    return []
  }
}

