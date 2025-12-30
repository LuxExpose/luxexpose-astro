# Database-First City Management Implementation

## Overview
Based on Lovable's recommendation, we're moving from static TypeScript files to a database-first approach where:
- **Lovable**: Manages all city data in Supabase tables
- **Astro**: Fetches city data from Supabase at build time
- **No file sync needed**: Single source of truth in database

## Database Schema (To be created in Lovable)

### New Tables Needed
1. `city_neighborhoods` - Neighborhoods per city
2. `city_stats` - Statistics per city
3. `city_copy` - Copywriting per city
4. `city_experiences` - Signature experiences per city

See Lovable's SQL schema in their response.

## Astro Implementation Plan

### Phase 1: Create Database Fetch Utilities
Create utility functions to fetch city data from Supabase:

- `src/utils/cities/fetchCityData.ts` - Fetch all city data by slug
- `src/utils/cities/fetchNeighborhoods.ts` - Already exists, update if needed
- `src/utils/cities/fetchStats.ts` - New function
- `src/utils/cities/fetchCopy.ts` - New function
- `src/utils/cities/fetchExperiences.ts` - New function

### Phase 2: Create Unified Dynamic Route
Replace individual city pages with single dynamic route:

- `src/pages/[city].astro` - Handles all cities dynamically
- Uses `getStaticPaths()` to generate routes for all cities
- Fetches data from Supabase at build time

### Phase 3: Update Existing Pages
Keep existing pages temporarily for SEO, but have them use database data:

- Update `boston.astro`, `miami.astro`, etc. to fetch from database
- Add redirects from old routes to new `[city].astro` route

### Phase 4: Migration
Once database tables are created and populated:

- Remove static data files (keep as backup)
- Update all references to use database
- Test all city pages

## Next Steps

1. **Lovable creates database tables** (Phase 1 from their plan)
2. **Lovable migrates existing data** (Phase 2 from their plan)
3. **We update Astro** to fetch from database (this implementation)
4. **Test and deploy**

## Benefits

✅ Single source of truth (Supabase)
✅ Non-technical team can manage cities in Lovable
✅ No file sync complexity
✅ Works for unlimited cities
✅ Astro generates static pages at build time (great for SEO)




