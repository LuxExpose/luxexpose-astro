// Static fallback data for cities
// This is used when database data is not available

export interface CityData {
  neighborhoods?: Array<{
    name: string;
    slug: string;
    description?: string;
    image?: string;
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

// Location IDs (fallback)
const locationIds: Record<string, string> = {
  boston: "boston-location-id", // Replace with actual ID
  nyc: "nyc-location-id",
  miami: "miami-location-id",
  doha: "doha-location-id",
  "las-vegas": "las-vegas-location-id",
};

// Static city data (fallback)
const cityDataMap: Record<string, CityData> = {
  boston: {
    neighborhoods: [],
    stats: [],
  },
  nyc: {
    neighborhoods: [],
    stats: [],
  },
  miami: {
    neighborhoods: [],
    stats: [],
  },
  doha: {
    neighborhoods: [],
    stats: [],
  },
  "las-vegas": {
    neighborhoods: [],
    stats: [],
  },
};

// Map locations for CityMap component
export const cityMapLocations: Record<string, Array<{
  name: string;
  lat: number;
  lng: number;
  type?: string;
}>> = {
  boston: [],
  nyc: [],
  miami: [],
  doha: [],
  "las-vegas": [],
};

export function getCityLocationId(slug: string): string | null {
  return locationIds[slug] || null;
}

export function getCityData(slug: string): CityData | null {
  return cityDataMap[slug] || null;
}

