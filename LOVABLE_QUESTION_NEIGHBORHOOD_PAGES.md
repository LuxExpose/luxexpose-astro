# Question for Lovable: Neighborhood Pages Implementation

## Current Situation

We have a "Explore the Neighborhoods" section on city pages (e.g., `/cities/miami`) that displays neighborhood cards. When users click on a neighborhood card, they're currently being linked to `/miami/neighborhoods/miami-beach` (or similar paths), but these pages don't exist yet.

## What We Need

We need to create dynamic neighborhood pages that display:
1. Neighborhood-specific content (name, description, images)
2. Articles related to that neighborhood
3. Experiences/locations in that neighborhood
4. SEO-optimized content

## Questions

1. **Database Structure:**
   - Do neighborhoods have their own table in Supabase?
   - What fields are available for neighborhoods (description, images, SEO metadata, etc.)?
   - Is there a relationship between neighborhoods and articles (e.g., `article.neighborhood_id` or `article.neighborhood_tags`)?
   - Is there a relationship between neighborhoods and experiences/locations?

2. **URL Structure:**
   - What should the URL pattern be? 
   - Current links use: `/{citySlug}/neighborhoods/{neighborhoodSlug}`
   - Should it be: `/cities/{citySlug}/neighborhoods/{neighborhoodSlug}` to match our city page structure?
   - Or: `/neighborhoods/{neighborhoodSlug}` (global neighborhood pages)?

3. **Data Fetching:**
   - How should we fetch neighborhood data?
   - Should we query `city_neighborhoods` table by slug?
   - Do neighborhoods have their own `location_id` or are they linked to the parent city's `location_id`?

4. **Article Filtering:**
   - How do we filter articles by neighborhood?
   - Do articles have a `neighborhood_id` field?
   - Or do articles use `neighborhood_tags` (array)?
   - Or should we search article content/titles for neighborhood names?

5. **Page Content:**
   - What content should neighborhood pages display?
   - Should they show:
     - Neighborhood description and images
     - Articles tagged with that neighborhood
     - Experiences/locations in that neighborhood
     - Related neighborhoods in the same city
   - Is there neighborhood-specific copy/content in the database?

6. **Original Implementation:**
   - How does the original luxexpose.com site handle neighborhood pages?
   - What URL structure does it use?
   - What content does it display?

7. **SEO Considerations:**
   - Should neighborhood pages have their own meta titles/descriptions?
   - Are there neighborhood-specific keywords we should target?
   - Should we create JSON-LD schema for neighborhoods?

## Current Implementation

We're currently linking to neighborhood pages from the `NeighborhoodExplorer` component:

```astro
<a href={`/${citySlug}/neighborhoods/${neighborhood.slug}`}>
```

But we need to:
1. Create the route handler (e.g., `src/pages/[citySlug]/neighborhoods/[neighborhoodSlug].astro` or similar)
2. Fetch neighborhood data from Supabase
3. Filter articles by neighborhood
4. Display neighborhood-specific content

## What We Need

Please provide:
1. Database schema for neighborhoods (table structure, relationships)
2. Recommended URL structure
3. How to filter articles by neighborhood
4. Example of what a neighborhood page should look like (from original site if available)
5. Any API endpoints or queries we should use

Thank you!

