export interface CityConfig {
  slug: string;
  name: string;
  state?: string;
  country: string;
  description: string;
  keywords: string[];
  themeClass?: string;
}

const cityConfigs: Record<string, CityConfig> = {
  boston: {
    slug: "boston",
    name: "Boston",
    state: "MA",
    country: "US",
    description: "Boston's premier luxury lifestyle guide featuring historic hotels, Michelin-starred restaurants, exclusive events, and high-end shopping.",
    keywords: ["Boston luxury", "Boston real estate", "Boston hotels", "Boston restaurants", "Boston lifestyle"],
  },
  nyc: {
    slug: "nyc",
    name: "New York City",
    state: "NY",
    country: "US",
    description: "New York City's premier luxury lifestyle guide featuring world-class hotels, Michelin-starred restaurants, exclusive events, and high-end shopping.",
    keywords: ["NYC luxury", "New York real estate", "NYC hotels", "NYC restaurants", "NYC lifestyle"],
  },
  miami: {
    slug: "miami",
    name: "Miami",
    state: "FL",
    country: "US",
    description: "Miami's premier luxury lifestyle guide featuring beachfront properties, world-class dining, exclusive events, and high-end shopping.",
    keywords: ["Miami luxury", "Miami real estate", "Miami hotels", "Miami restaurants", "Miami lifestyle"],
  },
  doha: {
    slug: "doha",
    name: "Doha",
    country: "QA",
    description: "Doha's premier luxury lifestyle guide featuring world-class hotels, fine dining, exclusive events, and high-end shopping.",
    keywords: ["Doha luxury", "Doha real estate", "Doha hotels", "Doha restaurants", "Doha lifestyle"],
  },
  "las-vegas": {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    country: "US",
    description: "Las Vegas's premier luxury lifestyle guide featuring world-class resorts, fine dining, exclusive events, and high-end shopping.",
    keywords: ["Las Vegas luxury", "Las Vegas real estate", "Las Vegas hotels", "Las Vegas restaurants", "Las Vegas lifestyle"],
  },
};

export function getCityConfig(slug: string): CityConfig | null {
  return cityConfigs[slug] || null;
}

export function getAllCitySlugs(): string[] {
  return Object.keys(cityConfigs);
}

