# How to Add a New City to Lux Exposé

## Overview
To add a new city (e.g., "London", "Paris", "Dubai"), you need to create several files and configurations. The system uses dynamic location lookup, so most of the work is in creating the city-specific data and page.

## Step-by-Step Process

### 1. Create City Data File
Create a new file: `src/data/cities/[city-slug].ts`

Example: `src/data/cities/london.ts`

```typescript
import type { CityStats, Neighborhood, CityCopy, MapLocation } from "./index";

export const londonStats: CityStats[] = [
  { label: "5-Star Hotels", value: "50+" },
  { label: "Michelin Stars", value: "70+" },
  { label: "Luxury Boutiques", value: "200+" },
];

export const londonNeighborhoods: Neighborhood[] = [
  {
    name: "Mayfair",
    description: "London's most exclusive district",
    slug: "mayfair",
  },
  {
    name: "Kensington",
    description: "Royal borough with elegant architecture",
    slug: "kensington",
  },
  // Add more neighborhoods...
];

export const londonCopy: CityCopy = {
  heroTagline: "Timeless Elegance, Modern Luxury",
  heroSubtext: "From historic palaces to cutting-edge design, London offers unparalleled sophistication.",
  explorationHeadline: "Curated for the Ultra-High-Net-Worth",
  explorationSubtext: "Access world-class art, bespoke fashion, and unparalleled cultural experiences.",
  categoryIntro: "London's luxury scene is defined by its rich heritage, world-class dining, and exclusive experiences. Our curated guides ensure you discover the city's most prestigious offerings.",
  experienceCallout: "Where UHNW individuals embrace a life of refined elegance and cultural sophistication.",
};

export const londonMapLocations: MapLocation[] = [
  {
    id: "1",
    title: "The Ritz London",
    slug: "the-ritz-london",
    lat: 51.5074,
    lng: -0.1428,
    category: "Hotels",
    excerpt: "Iconic 5-star hotel in Piccadilly",
  },
  // Add more map locations...
];
```

### 2. Export City Data
Update `src/data/cities/index.ts`:

```typescript
// Add import at top
import {
  londonStats,
  londonNeighborhoods,
  londonCopy,
  londonMapLocations,
} from "./london";

// Add to cityMapLocations object
export const cityMapLocations: Record<string, MapLocation[]> = {
  boston: bostonMapLocations,
  miami: miamiMapLocations,
  nyc: nycMapLocations,
  doha: dohaMapLocations,
  london: londonMapLocations, // Add this
};

// Add to cityData object
export const cityData: Record<string, {
  stats?: CityStats[];
  neighborhoods?: Neighborhood[];
  copy?: CityCopy;
}> = {
  boston: { ... },
  miami: { ... },
  nyc: { ... },
  doha: { ... },
  london: { // Add this
    stats: londonStats,
    neighborhoods: londonNeighborhoods,
    copy: londonCopy,
  },
};

// Optional: Add to cityLocationIds (for fallback)
export const cityLocationIds: Record<string, string> = {
  boston: "b550237e-031f-4c6b-bded-14b8f882d926",
  miami: "56b43a72-a095-4650-b312-9c231c25971a",
  nyc: "650f6b88-26bc-4aa0-b621-4f58c13a2111",
  doha: "",
  london: "", // Add when you have the location_id from Supabase
};
```

### 3. Add City Configuration
Update `src/utils/cityConfig.ts`:

```typescript
export const cityConfigs: Record<string, CityConfig> = {
  // ... existing cities ...
  london: {
    slug: 'london',
    name: 'London',
    fullName: 'Lux London',
    description: "Experience London's timeless luxury lifestyle. Explore historic palaces, world-class dining, and exclusive cultural experiences in the capital of elegance.",
    keywords: ["london luxury", "luxury london hotels", "mayfair luxury", "london michelin restaurants", "luxury london real estate", "luxury London", "London high-end", "premium London", "luxury UK"],
    state: undefined,
    country: "United Kingdom",
    themeClass: 'london-city-theme',
    colors: {
      primary: 'hsl(210, 50%, 45%)', // Customize for London
      accent: 'hsl(210, 50%, 55%)',
      secondary: 'hsl(30, 40%, 50%)',
    },
    copy: {
      heroTagline: 'Timeless Elegance, Modern Luxury',
      heroSubtext: 'From historic palaces to cutting-edge design, London offers unparalleled sophistication.',
      explorationHeadline: 'Curated for the Ultra-High-Net-Worth',
      explorationSubtext: 'Access world-class art, bespoke fashion, and unparalleled cultural experiences.',
      categoryIntro: "London's luxury scene is defined by its rich heritage, world-class dining, and exclusive experiences.",
      experienceCallout: 'Where UHNW individuals embrace a life of refined elegance and cultural sophistication.',
    },
    seo: {
      title: 'London Luxury Lifestyle | Lux London',
      description: "Experience London's timeless luxury lifestyle. Explore historic palaces, world-class dining, and exclusive cultural experiences.",
      keywords: ['london luxury', 'mayfair', 'london design district'],
    },
  },
};
```

### 4. Add City Theme CSS (Optional)
Update `src/styles/global.css`:

```css
/* London City Theme */
.london-city-theme {
  --city-primary: var(--london-primary);
  --city-accent: var(--london-accent);
  --city-secondary: var(--london-secondary);
}

:root {
  --london-primary: 210 50% 45%;
  --london-accent: 210 50% 55%;
  --london-secondary: 30 40% 50%;
}
```

### 5. Create City Page
Create `src/pages/[city-slug].astro` (e.g., `src/pages/london.astro`)

**Easiest method:** Copy an existing city page (e.g., `boston.astro`) and update:

1. Change `const citySlug = "boston";` to `const citySlug = "london";`
2. Update SEO titles and descriptions
3. Update map center coordinates for London
4. The rest should work automatically!

### 6. Add Location to Supabase (Required)
**This is critical!** The system uses dynamic location lookup, so you need:

1. Go to Supabase Dashboard → `locations` table
2. Add a new row with:
   - `slug`: "london" (must match city slug exactly)
   - `name`: "London"
   - `description`: (optional)
   - Other metadata fields as needed
3. Copy the `id` (UUID) and optionally add it to `cityLocationIds` in `src/data/cities/index.ts` as a fallback

**The system will automatically find the location_id by slug, so this is the most important step!**

## Quick Checklist

- [ ] Create `src/data/cities/[city-slug].ts` with stats, neighborhoods, copy, map locations
- [ ] Export city data in `src/data/cities/index.ts`
- [ ] Add city config in `src/utils/cityConfig.ts`
- [ ] (Optional) Add city theme CSS in `src/styles/global.css`
- [ ] Create `src/pages/[city-slug].astro` (copy from existing city page)
- [ ] **Add location to Supabase `locations` table with matching slug**
- [ ] Test the page at `http://localhost:4321/[city-slug]`

## Notes

- **Location Slug Must Match**: The `slug` in Supabase `locations` table must exactly match the city slug (e.g., "london", "paris", "dubai")
- **Dynamic Lookup**: The system automatically fetches location_id by slug, so you don't need to hardcode it (though you can add it as a fallback)
- **Articles**: Articles will automatically filter by location_id once the location exists in Supabase
- **Neighborhoods**: Can be managed in Supabase `neighborhoods` table or use static data as fallback

## Can Lovable Automate This?

Yes! You can ask Lovable to:
1. Create a city page generator/script
2. Create a form/UI to add new cities
3. Automate the Supabase location creation
4. Generate all the necessary files from a simple input

See `LOVABLE_QUESTION_CITY_GENERATOR.md` for questions to ask Lovable.




