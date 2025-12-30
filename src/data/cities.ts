export interface City {
  name: string;
  slug: string;
  description: string;
  path: string;
}

export const cities: City[] = [
  {
    name: 'Boston',
    slug: 'boston',
    description: 'Discover luxury in Historic New England',
    path: '/boston',
  },
  {
    name: 'Miami',
    slug: 'miami',
    description: 'Experience luxury in the Magic City',
    path: '/miami',
  },
  {
    name: 'New York',
    slug: 'nyc',
    description: 'Experience luxury in the Big Apple',
    path: '/nyc',
  },
  {
    name: 'Doha',
    slug: 'doha',
    description: 'Where tradition meets infinite ambition',
    path: '/doha',
  },
];

// Category order for sorting in city navbars
export const categoryOrder = [
  'automotive',
  'aviation',
  'beauty',
  'events',
  'experiences',
  'fashion',
  'hotels-resorts',
  'lifestyle',
  'people',
  'real-estate',
  'restaurants-venues'
];

// Featured categories shown directly in nav (rest go in "MORE" dropdown)
export const featuredCategorySlugs = ['automotive', 'real-estate', 'restaurants-venues'];

// Fallback city data structure
interface CityData {
  neighborhoods?: Array<{ name: string; slug: string; description?: string; image?: string }>;
  stats?: Array<{ icon: string; label: string; value: string; description?: string }>;
}

// Static fallback data for cities
const cityDataMap: Record<string, CityData> = {
  boston: {
    neighborhoods: [],
    stats: [],
  },
  miami: {
    neighborhoods: [],
    stats: [],
  },
  nyc: {
    neighborhoods: [],
    stats: [],
  },
  doha: {
    neighborhoods: [],
    stats: [],
  },
};

// Fallback location IDs (these should match your database)
const cityLocationIds: Record<string, string> = {
  boston: '',
  miami: '',
  nyc: '',
  doha: '',
};

// Map locations for each city (empty by default, should be populated from database)
export const cityMapLocations: Record<string, Array<{ lat: number; lng: number; name: string }>> = {
  boston: [],
  miami: [],
  nyc: [],
  doha: [],
};

/**
 * Get static fallback city data
 */
export function getCityData(slug: string): CityData | null {
  return cityDataMap[slug] || null;
}

/**
 * Get fallback location ID for a city slug
 */
export function getCityLocationId(slug: string): string | null {
  return cityLocationIds[slug] || null;
}
