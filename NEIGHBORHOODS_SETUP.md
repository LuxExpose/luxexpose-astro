# Neighborhoods Database Setup Guide

This guide explains how to set up the neighborhoods table in Supabase so that neighborhoods can be edited in Lovable.

## Steps to Enable Neighborhood Editing in Lovable

### 1. Create the Neighborhoods Table

Run the SQL script in your Supabase SQL Editor:

```sql
-- See sql/create_neighborhoods_table.sql for the complete script
```

Or run it directly in Supabase Dashboard:
1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Paste the contents of `sql/create_neighborhoods_table.sql`
4. Click **Run**

### 2. Verify the Table was Created

After running the SQL:
- Go to **Table Editor** in Supabase Dashboard
- You should see a new `neighborhoods` table
- It should already contain the 5 Boston neighborhoods from the initial data insert

### 3. Table Structure

The `neighborhoods` table has the following columns:

- `id` (UUID, Primary Key) - Auto-generated unique identifier
- `location_id` (UUID, Foreign Key) - Links to the `locations` table (e.g., Boston)
- `name` (Text) - Neighborhood name (e.g., "Back Bay")
- `slug` (Text) - URL-friendly identifier (e.g., "back-bay")
- `description` (Text) - Neighborhood description
- `image` (Text) - URL to neighborhood image
- `display_order` (Integer) - Order for display (lower numbers appear first)
- `is_active` (Boolean) - Whether the neighborhood is active/visible
- `created_at` (Timestamp) - Auto-set on creation
- `updated_at` (Timestamp) - Auto-updated on changes

### 4. How It Works

- **Astro Site**: Fetches neighborhoods from Supabase using the `fetchNeighborhoods()` utility
- **Fallback**: If Supabase fetch fails or table doesn't exist, it falls back to static data in `src/data/cities/boston.ts`
- **Lovable**: Can now edit neighborhoods through the Supabase interface (if you have a UI) or directly in the database

### 5. Adding Neighborhoods via Supabase

You can add neighborhoods in several ways:

**Option A: Via Supabase Dashboard**
1. Go to **Table Editor** → `neighborhoods`
2. Click **Insert** → **Insert row**
3. Fill in the fields:
   - `location_id`: Use Boston's location_id: `b550237e-031f-4c6b-bded-14b8f882d926`
   - `name`: Neighborhood name
   - `slug`: URL-friendly version (e.g., "cambridge")
   - `description`: Neighborhood description
   - `image`: Image URL (optional)
   - `display_order`: Number for ordering
   - `is_active`: `true`

**Option B: Via SQL**
```sql
INSERT INTO neighborhoods (location_id, name, slug, description, image, display_order, is_active)
VALUES (
  'b550237e-031f-4c6b-bded-14b8f882d926',
  'Cambridge',
  'cambridge',
  'Ivy League elegance with world-class museums and chef-driven restaurants.',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
  6,
  true
);
```

### 6. Location IDs for Other Cities

When adding neighborhoods for other cities, use these location_ids:
- **Boston**: `b550237e-031f-4c6b-bded-14b8f882d926`
- **Miami**: `650f6b88-26bc-4aa0-b621-4f58c13a2111`
- **NYC**: (Check your locations table for the correct ID)
- **Doha**: (Check your locations table for the correct ID)

### 7. Testing

After setting up:
1. Verify neighborhoods appear on `/boston` page
2. Add a new neighborhood in Supabase
3. Refresh the page - the new neighborhood should appear
4. Test fallback by temporarily setting `is_active = false` - neighborhood should disappear

### 8. Next Steps for Other Cities

To enable neighborhoods for other cities (Miami, NYC, Doha):
1. Update `src/pages/[city-slug].astro` to use `fetchNeighborhoods()` (same as Boston)
2. Add neighborhoods to the `neighborhoods` table with the appropriate `location_id`
3. The component will automatically work once data exists

## Troubleshooting

**Neighborhoods not showing?**
- Check that `is_active = true` in the database
- Verify `location_id` matches the city's location_id
- Check browser console for errors
- Verify Row Level Security (RLS) policies allow read access

**Getting errors?**
- The code has a fallback to static data, so the page should still work
- Check Supabase logs for database errors
- Verify the table exists and has the correct structure




