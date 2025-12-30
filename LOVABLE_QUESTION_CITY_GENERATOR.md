# Question for Lovable: City Page Generator

## Context
We have a multi-city website (Lux Exposé) with city pages for Boston, Miami, NYC, and Doha. Each city page requires creating several files and configurations. We want to streamline the process of adding new cities.

## Current Process (Manual)
To add a new city, we currently need to:
1. Create `src/data/cities/[city-slug].ts` with stats, neighborhoods, copy, map locations
2. Export city data in `src/data/cities/index.ts`
3. Add city config in `src/utils/cityConfig.ts`
4. Add city theme CSS in `src/styles/global.css` (optional)
5. Create `src/pages/[city-slug].astro` (copy from existing city page and modify)
6. Add location to Supabase `locations` table with matching slug

## What We Need

### Option 1: Automated Script/Generator
Can you create a script or generator that:
- Takes city name, slug, and basic info as input
- Generates all necessary files automatically
- Creates the Supabase location entry (or provides SQL to run)
- Follows the existing patterns and structure

**Input format example:**
```javascript
{
  slug: "london",
  name: "London",
  country: "United Kingdom",
  coordinates: { lat: 51.5074, lng: -0.1428 },
  stats: [...],
  neighborhoods: [...],
  // etc.
}
```

### Option 2: Admin UI/Form
Can you create an admin interface where we can:
- Fill out a form with city details
- Click "Generate City Page"
- System automatically creates all files and Supabase entries
- Preview the new city page

### Option 3: CLI Tool
Can you create a command-line tool like:
```bash
npm run add-city --slug=london --name="London" --country="United Kingdom"
```

## Questions

1. **Which approach would be best for our Astro project?**
   - Script/Generator
   - Admin UI/Form
   - CLI Tool
   - Something else?

2. **Can you create a city page generator script?**
   - Should it be a Node.js script?
   - Should it use templates?
   - How should it handle file creation and updates?

3. **Can you automate Supabase location creation?**
   - Should the script call Supabase API directly?
   - Or generate SQL that we can run?
   - How should we handle authentication?

4. **What information is required vs. optional?**
   - Minimum required fields to create a city page?
   - What can be added later?
   - What has sensible defaults?

5. **Can you create a template system?**
   - Base templates for city data files?
   - Template for city page?
   - Template for city config?

6. **Error handling and validation?**
   - How should we validate city slug uniqueness?
   - How should we handle existing cities?
   - What error messages should we show?

## Example Use Case

**Scenario:** We want to add "London" as a new city.

**Current process:** 
- Manually create 5+ files
- Manually update 3+ existing files
- Manually add Supabase entry
- Test and debug

**Desired process:**
- Run one command or fill one form
- All files created automatically
- Supabase entry created
- Ready to customize and test

## Technical Details

**File Structure:**
```
src/
  data/cities/
    [city-slug].ts          # City-specific data
  pages/
    [city-slug].astro       # City page
  utils/
    cityConfig.ts           # City configuration (needs update)
  styles/
    global.css              # City themes (needs update)
```

**Supabase Requirements:**
- `locations` table must have a row with `slug` matching city slug
- System uses dynamic lookup: `fetchLocationIdBySlug(citySlug)`

**Dependencies:**
- Astro framework
- Supabase client
- TypeScript

## Expected Output

When adding a new city, the generator should:
1. ✅ Create `src/data/cities/[city-slug].ts`
2. ✅ Update `src/data/cities/index.ts` exports
3. ✅ Update `src/utils/cityConfig.ts` with city config
4. ✅ Create `src/pages/[city-slug].astro` (based on template)
5. ✅ (Optional) Update `src/styles/global.css` with theme
6. ✅ Create Supabase location entry or provide SQL
7. ✅ Validate all inputs
8. ✅ Show success/error messages

## Additional Features (Nice to Have)

- **Validation**: Check if city slug already exists
- **Preview**: Show what files will be created before generating
- **Rollback**: Ability to remove a city if needed
- **Update**: Ability to update existing city data
- **Bulk import**: Add multiple cities at once from CSV/JSON

Please provide guidance on the best approach and help us implement it!




