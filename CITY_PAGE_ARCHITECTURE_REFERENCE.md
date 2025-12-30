# City Page Architecture - Complete Reference Guide

**Date:** January 2025  
**Purpose:** Reference documentation for city page implementation

## Overview: Unified City Page Architecture

### Key Concept
**All city pages (Boston, Miami, NYC, Doha) share the exact same template structure but are populated with city-specific data.**

Think of it as **ONE template with FOUR data configurations**.

```
┌─────────────────────────────────────┐
│   City Page Template (Shared)      │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  City Data Configuration    │  │
│   │  - Boston                   │  │
│   │  - Miami                    │  │
│   │  - NYC                      │  │
│   │  - Doha                     │  │
│   └─────────────────────────────┘  │
│                                     │
│   Same structure, different data    │
└─────────────────────────────────────┘
```

## Complete Section Breakdown

All city pages follow this exact structure (18 sections in order):

| # | Section | Component | Purpose |
|---|---------|-----------|---------|
| 1 | City Ambience | `CityAmbience` | Floating animated orbs with city colors |
| 2 | City Navbar | `BostonNavbar` (city-specific) | City-branded navigation with network links |
| 3 | Hero Slider | `HeroSection` | Featured articles carousel |
| 4 | Hero Subtitle | Custom | City tagline and subtext |
| 5 | Breadcrumbs | `Breadcrumbs` | Navigation path |
| 6 | SEO H1 & Description | Custom | Page title and description |
| 7 | City Stats Box | `CityStatsBox` | Key city statistics |
| 8 | Search & Filters | Custom | Search + category dropdown |
| 9 | Main Content Grid | `ArticleCard` grid | 2-column article cards |
| 10 | Sidebar | Widgets | Trending + Experiences |
| 11 | Only In City | `OnlyInCity` | Signature experiences |
| 12 | City Directory | `CityDirectorySection` | Local luxury businesses |
| 13 | Neighborhood Explorer | `NeighborhoodExplorer` | Neighborhood cards |
| 14 | Interactive Map | `InteractiveCityMap` | Leaflet map with locations |
| 15 | Seasonal Recommendations | `SeasonalRecommendations` | Season-based activities |
| 16 | City Comparison | `CityComparison` | Luxury metrics scores |
| 17 | Cross-Platform Widget | `CrossPlatformWidget` | Global network content |
| 18 | Footer | `Footer` | Site footer |

## Implementation Strategy

### 1. Template Structure
Create a shared template component that accepts city data as props:

```astro
---
// src/pages/cities/[citySlug].astro
interface CityData {
  name: string;
  slug: string;
  colors: {
    primary: string;
    accent: string;
  };
  stats: Array<{...}>;
  neighborhoods: Array<{...}>;
  // ... other city-specific data
}

const { citySlug } = Astro.params;
const cityData = getCityData(citySlug);
---

<Layout>
  <CityAmbience colors={cityData.colors} />
  <CityNavbar city={cityData} />
  <HeroSection articles={cityData.featuredArticles} />
  <!-- ... rest of sections ... -->
</Layout>
```

### 2. Data Configuration
Store city-specific data in a centralized location:

```typescript
// src/data/cities.ts
export const cityData = {
  boston: {
    name: "Boston",
    slug: "boston",
    colors: { primary: "#8B0000", accent: "#DC143C" },
    tagline: "Discover luxury in Historic New England",
    // ... all city-specific data
  },
  miami: { /* ... */ },
  nyc: { /* ... */ },
  doha: { /* ... */ },
};
```

### 3. Component Reusability
Most components are reusable across cities:
- `CityAmbience` - Accepts color props
- `CityStatsBox` - Accepts stats data
- `NeighborhoodExplorer` - Accepts neighborhood data
- `InteractiveCityMap` - Accepts location data
- etc.

## Key Components to Implement

### City-Specific Components

1. **CityAmbience**
   - Floating animated orbs
   - Uses city-specific colors
   - Background effect

2. **CityNavbar** (e.g., `BostonNavbar`)
   - City-branded navigation
   - Network links to other cities
   - City-specific styling

3. **CityStatsBox**
   - Key statistics display
   - Luxury metrics
   - City-specific data

4. **OnlyInCity**
   - Signature experiences
   - Unique to each city
   - Curated content

5. **CityDirectorySection**
   - Local luxury businesses
   - Restaurants, hotels, shops
   - City-specific listings

6. **NeighborhoodExplorer**
   - Neighborhood cards
   - Interactive exploration
   - City-specific neighborhoods

7. **InteractiveCityMap**
   - Leaflet.js integration
   - City locations
   - Interactive markers

8. **SeasonalRecommendations**
   - Season-based activities
   - Time-sensitive content
   - City-specific recommendations

9. **CityComparison**
   - Luxury metrics scores
   - Comparison with other cities
   - Data visualization

10. **CrossPlatformWidget**
    - Global network content
    - Cross-city content
    - Network integration

## Data Requirements

### City Data Structure

```typescript
interface CityData {
  // Basic Info
  name: string;
  slug: string;
  path: string;
  description: string;
  
  // Visual
  colors: {
    primary: string;
    accent: string;
    background?: string;
  };
  
  // Content
  tagline: string;
  subtitle: string;
  featuredArticles: Article[];
  
  // Statistics
  stats: Array<{
    icon: string;
    label: string;
    value: string;
    description?: string;
  }>;
  
  // Locations
  neighborhoods: Array<{
    name: string;
    slug: string;
    description: string;
    image?: string;
  }>;
  
  locations: Array<{
    name: string;
    lat: number;
    lng: number;
    type: string;
  }>;
  
  // Experiences
  onlyInCity: Experience[];
  seasonalRecommendations: SeasonalActivity[];
  
  // Directory
  directory: Array<{
    name: string;
    category: string;
    address: string;
    // ...
  }>;
  
  // Comparison Data
  comparison: {
    luxuryScore: number;
    diningScore: number;
    // ... other metrics
  };
}
```

## Routing Structure

### File Structure
```
src/
├── pages/
│   └── cities/
│       └── [citySlug].astro          # Main city page template
├── components/
│   ├── cities/
│   │   ├── CityAmbience.astro
│   │   ├── CityNavbar.astro
│   │   ├── CityStatsBox.astro
│   │   ├── OnlyInCity.astro
│   │   ├── CityDirectorySection.astro
│   │   ├── NeighborhoodExplorer.astro
│   │   ├── InteractiveCityMap.astro
│   │   ├── SeasonalRecommendations.astro
│   │   ├── CityComparison.astro
│   │   └── CrossPlatformWidget.astro
│   └── shared/
│       ├── HeroSection.astro
│       ├── Breadcrumbs.astro
│       ├── ArticleCard.astro
│       └── ...
└── data/
    └── cities.ts                      # City data configuration
```

### URL Structure
- `/boston` → Boston city page
- `/miami` → Miami city page
- `/nyc` → New York city page
- `/doha` → Doha city page

## Implementation Notes

### 1. Data Fetching
- Fetch city data from Supabase
- Use city slug to query location-specific content
- Cache city data at build time

### 2. Styling
- Use city-specific color variables
- Apply colors to `CityAmbience` orbs
- Style `CityNavbar` with city branding

### 3. SEO
- City-specific H1 tags
- Meta descriptions per city
- Canonical URLs
- Open Graph tags

### 4. Performance
- Pre-render at build time
- Lazy load map component
- Optimize images per city

## Example: Boston Page Structure

```astro
---
// src/pages/cities/[citySlug].astro
import { getCityData } from '../../data/cities';
import CityAmbience from '../../components/cities/CityAmbience.astro';
import CityNavbar from '../../components/cities/CityNavbar.astro';
// ... other imports

const { citySlug } = Astro.params;
const cityData = await getCityData(citySlug);

if (!cityData) {
  return Astro.redirect('/404');
}
---

<Layout>
  <!-- Section 1: City Ambience -->
  <CityAmbience colors={cityData.colors} />
  
  <!-- Section 2: City Navbar -->
  <CityNavbar city={cityData} />
  
  <!-- Section 3: Hero Slider -->
  <HeroSection articles={cityData.featuredArticles} />
  
  <!-- Section 4: Hero Subtitle -->
  <div class="hero-subtitle">
    <p>{cityData.tagline}</p>
    <p>{cityData.subtitle}</p>
  </div>
  
  <!-- Section 5: Breadcrumbs -->
  <Breadcrumbs items={[
    { label: 'Home', path: '/' },
    { label: cityData.name, path: cityData.path }
  ]} />
  
  <!-- Section 6: SEO H1 & Description -->
  <h1>{cityData.name} Luxury Guide</h1>
  <p>{cityData.description}</p>
  
  <!-- Section 7: City Stats Box -->
  <CityStatsBox stats={cityData.stats} />
  
  <!-- Section 8: Search & Filters -->
  <SearchFilters categories={cityData.categories} />
  
  <!-- Section 9: Main Content Grid -->
  <ArticleGrid articles={cityData.articles} />
  
  <!-- Section 10: Sidebar -->
  <Sidebar>
    <TrendingWidget />
    <ExperiencesWidget />
  </Sidebar>
  
  <!-- Section 11: Only In City -->
  <OnlyInCity experiences={cityData.onlyInCity} />
  
  <!-- Section 12: City Directory -->
  <CityDirectorySection directory={cityData.directory} />
  
  <!-- Section 13: Neighborhood Explorer -->
  <NeighborhoodExplorer neighborhoods={cityData.neighborhoods} />
  
  <!-- Section 14: Interactive Map -->
  <InteractiveCityMap 
    city={cityData.name}
    locations={cityData.locations}
    center={[cityData.lat, cityData.lng]}
  />
  
  <!-- Section 15: Seasonal Recommendations -->
  <SeasonalRecommendations recommendations={cityData.seasonalRecommendations} />
  
  <!-- Section 16: City Comparison -->
  <CityComparison comparison={cityData.comparison} />
  
  <!-- Section 17: Cross-Platform Widget -->
  <CrossPlatformWidget />
  
  <!-- Section 18: Footer -->
  <Footer />
</Layout>
```

## Next Steps

When implementing city pages:

1. **Start with data structure** - Define `CityData` interface
2. **Create shared template** - `[citySlug].astro` with all 18 sections
3. **Build components incrementally** - Start with simpler ones
4. **Test with one city** - Boston as reference
5. **Replicate for other cities** - Use same template with different data

## Reference

- Original site: https://luxexpose.com/boston
- City data should come from Supabase `locations` table
- Use existing `src/data/cities.ts` as starting point

---

**This architecture ensures consistency across all city pages while allowing city-specific customization through data configuration.**

