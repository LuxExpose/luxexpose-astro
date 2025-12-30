# Neighborhood Image Sync Issue - Debug Guide

## Problem
Neighborhood images on `http://localhost:4321/nyc` are not matching the ones on `https://luxexpose.com/nyc`.

## Root Cause
The `NeighborhoodExplorer` component matches images from `media_library` table by neighborhood name, but the matching was case-sensitive and didn't handle variations.

## Fix Applied

### 1. Case-Insensitive Matching
- Store images in Map with normalized (lowercase, trimmed) keys
- Look up images using multiple case variations
- Added debug logging in development mode

### 2. Database Field Support
- Now handles both `image` and `image_url` fields (for database vs static data)

## How It Works

1. **Query media_library:**
   ```sql
   SELECT file_path, caption 
   FROM media_library 
   WHERE caption ILIKE 'nyc - neighborhoods%'
   ```

2. **Extract neighborhood name:**
   - Caption format: `"nyc - neighborhoods - Upper East Side"`
   - Regex: `/neighborhoods\s*-\s*(.+)$/i`
   - Extracts: `"Upper East Side"`

3. **Store in Map:**
   - Key: `"upper east side"` (normalized)
   - Key: `"Upper East Side"` (original)
   - Value: Full image URL

4. **Lookup priority:**
   - Try exact match: `neighborhood.name`
   - Try lowercase: `neighborhood.name.toLowerCase().trim()`
   - Try uppercase: `neighborhood.name.toUpperCase().trim()`
   - Fallback to provided `image` or `image_url`
   - Final fallback to Unsplash

## Testing

1. **Check browser console** (in dev mode):
   - Look for: `[NeighborhoodExplorer] Found X custom images for nyc`
   - Look for: `[NeighborhoodExplorer] Custom image keys: [...]`
   - Look for: `[NeighborhoodExplorer] No custom image found for "..."`

2. **Verify media_library entries:**
   - Caption should match: `"nyc - neighborhoods - {Neighborhood Name}"`
   - Neighborhood name should match exactly (case-insensitive now)
   - File path should be valid

3. **Check neighborhood names:**
   - Static data: `"Upper East Side"`, `"SoHo"`, `"Tribeca"`, etc.
   - Database: Should match exactly (case-insensitive)

## Expected Caption Format in media_library

For NYC neighborhoods, captions should be:
- `"nyc - neighborhoods - Upper East Side"`
- `"nyc - neighborhoods - SoHo"`
- `"nyc - neighborhoods - Tribeca"`
- `"nyc - neighborhoods - West Village"`
- `"nyc - neighborhoods - Chelsea"`
- `"nyc - neighborhoods - Upper West Side"`

## Next Steps

1. **Verify media_library entries exist** for NYC neighborhoods
2. **Check caption format** matches expected pattern
3. **Test in browser** - check console logs
4. **Compare with live site** - ensure same images appear

## If Still Not Working

1. Check Supabase `media_library` table:
   ```sql
   SELECT caption, file_path 
   FROM media_library 
   WHERE caption ILIKE '%nyc%neighborhoods%'
   ORDER BY caption;
   ```

2. Verify neighborhood names match exactly (case-insensitive)
3. Check file_path format - should be accessible URL
4. Add more debug logging if needed




