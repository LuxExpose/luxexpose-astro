# Update Remaining City Pages

## Status
- ✅ Boston - Updated to database-first
- ✅ Miami - Updated to database-first  
- ⏳ NYC - Needs update
- ⏳ Doha - Needs update

## Pattern to Follow

For each remaining city page (NYC, Doha), apply these changes:

### 1. Update Imports
```typescript
// Remove:
import { fetchNeighborhoods } from "../utils/neighborhoods";

// Add:
import { fetchCompleteCityData } from "../utils/cities/fetchCityData";
```

### 2. Replace Data Fetching Section
Replace the section that fetches locationId, neighborhoods, etc. with:

```typescript
// Database-First Approach: Fetch all city data from Supabase
const cityDataFromDB = await fetchCompleteCityData(citySlug);
const cityData = getCityData(citySlug); // Static fallback

// Use database data if available, otherwise fallback to static
const locationId = cityDataFromDB?.location.id || null;
const cityMetadata = cityDataFromDB?.location || null;

// Neighborhoods: Database first, static fallback
let neighborhoods: any[] = [];
if (cityDataFromDB?.neighborhoods && cityDataFromDB.neighborhoods.length > 0) {
  neighborhoods = cityDataFromDB.neighborhoods.map(n => ({
    name: n.name,
    slug: n.slug,
    description: n.description,
    image: n.image_url,
  }));
} else {
  neighborhoods = cityData?.neighborhoods || [];
}

// Stats: Database first, static fallback
let stats: any[] = [];
if (cityDataFromDB?.stats && cityDataFromDB.stats.length > 0) {
  stats = cityDataFromDB.stats.map(s => ({
    icon: s.icon,
    label: s.label,
    value: s.value,
    description: s.description || '',
  }));
} else {
  stats = cityData?.stats || [];
}

// Copy: Database first, static fallback
const copy = cityDataFromDB?.copy || cityData?.copy || null;

// Get location_id for article fetching (database first, then fallback)
let articleLocationId = locationId;
if (!articleLocationId) {
  const fallbackLocationId = getCityLocationId(citySlug);
  if (fallbackLocationId) {
    if (import.meta.env.DEV) {
      console.warn(`[${city.name} Page] Using fallback location_id: ${fallbackLocationId}`);
    }
    articleLocationId = fallbackLocationId;
  } else {
    console.error(`[${city.name} Page] ERROR: No location_id found for city slug: ${citySlug}`);
    return new Response(`Missing location data for ${city.name}. Please check the locations table in Supabase.`, { status: 500 });
  }
}
```

### 3. Update Component Calls
Replace `cityData?.copy?.heroTagline` with `copy?.hero_tagline || copy?.heroTagline`
Replace `cityData?.stats` with `stats`
Replace `cityData?.copy?.explorationHeadline` with `copy?.exploration_headline || copy?.explorationHeadline`

### 4. Update Article Queries
Replace `locationId` with `articleLocationId` in article fetch queries.

## Field Name Mapping

Database uses snake_case, static data uses camelCase. Support both:

- `hero_tagline` / `heroTagline`
- `hero_subtext` / `heroSubtext`
- `exploration_headline` / `explorationHeadline`
- `exploration_subtext` / `explorationSubtext`
- `category_intro` / `categoryIntro`
- `experience_callout` / `experienceCallout`




