# Question for Lovable: City-Specific Data and Article Filtering

## Problem
We've consolidated all city pages to use a single dynamic route `/cities/[citySlug]`, but:

1. **Articles are missing**: City pages are not showing city-specific articles
2. **Sections are generic**: All city sections (stats, neighborhoods, experiences) appear to be the same across cities instead of unique per city

## Current Implementation

### Article Fetching
We're using `mobile-api-feed` with `location_id` parameter:

```typescript
const featuredResponse = await fetch(`${FUNCTIONS_BASE}/mobile-api-feed`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "featured",
    location_id: locationId,  // From locations table
    page: 1,
    limit: 5,
  }),
});
```

### City Data Fetching
We're using `getCityData()` from Supabase which queries:
- `locations` table (by slug)
- `city_copy` (joined)
- `city_stats` (joined)
- `city_experiences` (joined)
- `city_neighborhoods` (joined)

## Questions

1. **How does `mobile-api-feed` filter articles by city?**
   - Does it support `location_id` parameter?
   - Does it support `city_slug` or `city_tags` parameter?
   - What's the exact API contract for city-specific article filtering?

2. **City-specific data tables:**
   - Are `city_stats`, `city_neighborhoods`, `city_experiences`, and `city_copy` filtered by `location_id` automatically in the join?
   - Or do we need to explicitly filter them?
   - Are these tables one-to-many with locations (each city has its own set)?

3. **Original LuxExpose.com implementation:**
   - How does the original site (luxexpose.com/boston, luxexpose.com/miami, etc.) filter articles by city?
   - What API endpoints or queries does it use?
   - Are articles filtered by `location_id`, `city_tags`, or both?

4. **Expected data structure:**
   - Should each city have unique `city_stats` rows in the database?
   - Should each city have unique `city_neighborhoods` rows?
   - How is the relationship between `locations` and these tables structured in the database schema?

## What We Need

We need to understand:
1. The correct way to fetch city-specific articles from `mobile-api-feed`
2. How to ensure city-specific data (stats, neighborhoods, experiences, copy) is correctly filtered and displayed per city
3. Whether our current database query approach is correct or if we need to adjust it

Please provide the exact API documentation and database schema information needed to make city pages display unique, city-specific content.
