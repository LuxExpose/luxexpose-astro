# Response to Lovable: City Article Filtering Implementation

## Our Request

We would like **BOTH** `location_id` AND `city_slug` parameters supported in `mobile-api-feed`:

1. **`location_id` (UUID)**: Filter by exact location UUID
   - More precise, uses direct foreign key relationship
   - Example: `location_id: "550e8400-e29b-41d4-a716-446655440000"`

2. **`city_slug` (string)**: Filter by city_tags array containing the slug
   - More flexible, works with articles that have city_tags arrays
   - Example: `city_slug: "miami"` filters articles where `city_tags @> '["miami"]'`
   - Should support articles where `city_tags` contains the slug (e.g., `["miami", "florida"]` contains `"miami"`)

## Implementation Details

The edge function should filter articles where:
- `articles.location_id = <provided location_id>`, OR
- `articles.city_tags` array contains the `<provided city_slug>`

This matches our current database structure where articles can be associated with cities via either method.

## Current Workaround

We've implemented a direct Supabase query as a temporary workaround (`getCityArticles()` in `src/lib/supabase.ts`), but we'd prefer to use the edge function once it's updated for consistency with the rest of the codebase.

## Once Updated

Once `mobile-api-feed` supports these parameters, we'll update our city pages to use:
```typescript
const response = await fetch(`${FUNCTIONS_BASE}/mobile-api-feed`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "latest", // or "featured"
    location_id: locationId, // Optional: filter by location UUID
    city_slug: citySlug,     // Optional: filter by city slug (searches city_tags)
    page: 1,
    limit: 12,
  }),
});
```

Thank you!

