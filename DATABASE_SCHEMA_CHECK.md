# Database Schema Check for City Routing

## Issue
New cities added to the `locations` table (like "Las Vegas" with slug `las-vegas`) aren't generating pages after deploy.

## Current Implementation

### Files Involved:
1. **`src/lib/supabase.ts`** - `getAllCities()` function (lines 55-73)
2. **`src/pages/cities/[citySlug].astro`** - Dynamic route with `getStaticPaths()`
3. **`src/pages/cities.astro`** - Cities index page

### Query Logic:
The `getAllCities()` function now:
1. **First tries** to filter by `location_type = 'city'` (if column exists)
2. **Falls back** to fetching all locations if `location_type` column doesn't exist
3. **Handles errors** gracefully with multiple fallback strategies

## Database Schema Requirements

### Required Columns in `locations` table:
- `id` (UUID, PRIMARY KEY)
- `slug` (TEXT, UNIQUE) - e.g., "boston", "miami", "las-vegas"
- `name` (TEXT) - e.g., "Boston", "Miami", "Las Vegas"

### Optional Column:
- `location_type` (TEXT) - If this column exists, it should be set to `'city'` for cities

## How to Verify Your Schema

### Option 1: Check via Supabase Dashboard
1. Go to Supabase Dashboard → Table Editor → `locations` table
2. Check if `location_type` column exists
3. If it exists, verify cities have `location_type = 'city'`

### Option 2: Run SQL Query in Supabase SQL Editor
```sql
-- Check if location_type column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'locations' 
  AND column_name = 'location_type';

-- If column exists, check values
SELECT id, slug, name, location_type 
FROM locations 
ORDER BY name;

-- If column doesn't exist, you'll see all locations
SELECT id, slug, name 
FROM locations 
ORDER BY name;
```

### Option 3: Check Sample Location
```sql
-- Get one location to see all columns
SELECT * FROM locations LIMIT 1;
```

## Fixes Applied

### 1. Added `location_type` Filter (with fallback)
- If `location_type` column exists → filters by `location_type = 'city'`
- If column doesn't exist → returns all locations (assumes all are cities)

### 2. Made City Config Optional
- New cities without a config in `src/utils/cityConfig.ts` will auto-generate a default config
- This allows cities like "Las Vegas" to work immediately without manual config setup

### 3. Route Path
- Pages are generated at `/cities/[citySlug]` (e.g., `/cities/las-vegas`)
- This is correct and matches the dynamic route structure

## Testing

After deploying, verify:
1. **Cities Index**: Visit `/cities` - should list all cities from database
2. **City Page**: Visit `/cities/las-vegas` - should generate page if Las Vegas exists in `locations` table
3. **Build Logs**: Check build output for any errors about `location_type` column

## Next Steps

1. **Verify schema**: Run the SQL queries above to confirm your `locations` table structure
2. **Add location_type if needed**: If you want to filter by type, add the column:
   ```sql
   ALTER TABLE locations ADD COLUMN IF NOT EXISTS location_type TEXT;
   UPDATE locations SET location_type = 'city' WHERE location_type IS NULL;
   ```
3. **Rebuild**: After schema changes, rebuild the Astro site
4. **Test**: Visit `/cities` and `/cities/las-vegas` to verify pages generate

## Troubleshooting

### Issue: No cities showing on `/cities` page
- **Check**: Are there any rows in the `locations` table?
- **Check**: Are there any errors in the build logs?
- **Check**: Does `getAllCities()` return data? (add console.log in dev mode)

### Issue: City page returns 404
- **Check**: Does the city exist in `locations` table with correct `slug`?
- **Check**: Does `getCityData(citySlug)` return data?
- **Check**: Are there any errors in the build logs about missing city config?

### Issue: Build fails with "column location_type does not exist"
- **Solution**: The code now handles this automatically with fallback
- **Verify**: Check build logs to confirm fallback is working




