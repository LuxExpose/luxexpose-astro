# Debug Neighborhood Images - Step by Step

## Issue
Neighborhood images on `http://localhost:4321/nyc` don't match `https://luxexpose.com/nyc`.

## Enhanced Debugging Added

The component now has extensive logging. Check your browser console (dev mode) for:

1. **Media Library Query Results:**
   ```
   [NeighborhoodExplorer] Found X media_library items for nyc: [...]
   ```

2. **Image Mapping:**
   ```
   [NeighborhoodExplorer] Mapped "Upper East Side" (normalized: "upper east side") -> URL
   ```

3. **Per-Neighborhood Lookup:**
   ```
   [NeighborhoodExplorer] ✓ Using custom image for "Upper East Side"
   OR
   [NeighborhoodExplorer] ✗ No custom image for "Upper East Side" (normalized: "upper east side")
   [NeighborhoodExplorer]   Available keys: [...]
   ```

## What to Check

### 1. Check Browser Console
Open `http://localhost:4321/nyc` and check the console for:
- How many media_library items were found
- What captions were found
- What neighborhood names were extracted
- Which neighborhoods matched/didn't match

### 2. Check Supabase media_library Table

Run this query in Supabase:
```sql
SELECT caption, file_path, bucket_name 
FROM media_library 
WHERE caption ILIKE '%nyc%neighborhood%'
ORDER BY caption;
```

**Expected captions:**
- `"nyc - neighborhoods - Upper East Side"`
- `"nyc - neighborhoods - SoHo"`
- `"nyc - neighborhoods - Tribeca"`
- etc.

### 3. Verify Neighborhood Names Match

Check that the neighborhood names in your data match the captions:

**Static data (src/data/cities/nyc.ts):**
- "Upper East Side"
- "SoHo"
- "Tribeca"
- "West Village"
- "Chelsea"
- "Upper West Side"

**Database (city_neighborhoods table):**
- Should match exactly (case-insensitive)

### 4. Check File Path Format

The component handles:
- Full URLs: `https://...`
- Absolute paths: `/path/to/image.jpg`
- Relative paths: `path/to/image.jpg`

All are converted to Supabase storage URLs.

## Common Issues

### Issue 1: No media_library items found
**Symptom:** Console shows "No media_library items found"
**Solution:** 
- Check if images exist in media_library table
- Verify caption format matches: `"{citySlug} - neighborhoods - {Name}"`
- Check if bucket_name is correct (defaults to 'city-images')

### Issue 2: Names don't match
**Symptom:** Console shows "No custom image for..." but items were found
**Solution:**
- Check exact neighborhood names in captions vs data
- Look at "Available keys" in console to see what was extracted
- Verify case/spacing matches

### Issue 3: Images not loading
**Symptom:** URLs are found but images don't display
**Solution:**
- Check if URLs are accessible
- Verify bucket permissions in Supabase
- Check if file_path format is correct

## Next Steps

1. **Check console output** - Share what you see
2. **Check Supabase** - Verify media_library entries exist
3. **Compare names** - Ensure neighborhood names match exactly
4. **Test URLs** - Try accessing image URLs directly

## If Still Not Working

Please share:
1. Console output from browser
2. Results from Supabase query
3. Screenshot of what you see vs what you expect

This will help identify the exact issue.




