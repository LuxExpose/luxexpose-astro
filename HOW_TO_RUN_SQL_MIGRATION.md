# How to Run SQL Migration - Step by Step Guide

## Method 1: Supabase Dashboard (Easiest) ⭐ Recommended

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (the one used for luxexpose)

### Step 2: Open SQL Editor
1. In the left sidebar, click **"SQL Editor"**
2. Click **"New query"** button (top right)

### Step 3: Copy and Paste SQL
1. Open the file: `scripts/populate-neighborhoods-from-static.sql`
2. Select all the content (Cmd+A / Ctrl+A)
3. Copy it (Cmd+C / Ctrl+C)
4. Paste it into the SQL Editor in Supabase (Cmd+V / Ctrl+V)

### Step 4: Run the SQL
1. Click the **"Run"** button (bottom right, or press Cmd+Enter / Ctrl+Enter)
2. Wait for the query to complete
3. You should see a success message: "Success. No rows returned" or similar

### Step 5: Verify
Run this query in the SQL Editor to check if the data was populated:

```sql
SELECT 
  name,
  slug,
  hero_image_url IS NOT NULL as has_hero,
  jsonb_array_length(gallery_images) as gallery_count,
  jsonb_array_length(stats) as stats_count,
  seo_title IS NOT NULL as has_seo
FROM city_neighborhoods
WHERE slug = 'back-bay';
```

You should see:
- `has_hero` = `t` (true)
- `gallery_count` = `3`
- `stats_count` = `6`
- `has_seo` = `t` (true)

---

## Method 2: Using psql (Command Line)

### Prerequisites
- PostgreSQL client (`psql`) installed
- Database connection string

### Step 1: Get Connection String
1. Go to Supabase Dashboard → Project Settings → Database
2. Find "Connection string" → "URI"
3. Copy the connection string (looks like: `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)

### Step 2: Run SQL File
Replace `[CONNECTION_STRING]` with your actual connection string:

```bash
psql "[CONNECTION_STRING]" -f scripts/populate-neighborhoods-from-static.sql
```

Or if you want to type it interactively:

```bash
psql "[CONNECTION_STRING]"
```

Then in the psql prompt:
```sql
\i scripts/populate-neighborhoods-from-static.sql
```

---

## Method 3: Using Database Client (pgAdmin, DBeaver, etc.)

### Step 1: Connect to Database
1. Open your database client
2. Connect using your Supabase connection details:
   - Host: `db.xxxxx.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: (from Supabase Dashboard)

### Step 2: Open SQL File
1. Open the SQL file: `scripts/populate-neighborhoods-from-static.sql`
2. Copy all content
3. Paste into a new SQL query window

### Step 3: Execute
1. Click "Execute" or "Run" button
2. Check for success message

---

## Troubleshooting

### "Permission denied" or "Access denied"
- Make sure you're using the correct database credentials
- Check that your user has UPDATE permissions on `city_neighborhoods` table

### "Table does not exist"
- Verify you're connected to the correct database
- Check that the `city_neighborhoods` table exists

### "Column does not exist"
- The migration might not have been run yet
- Check that the new columns (`hero_image_url`, `gallery_images`, etc.) exist in the table
- If not, the database schema migration needs to be run first

### SQL Syntax Errors
- Make sure you copied the entire SQL file
- Check for any special characters that might have been corrupted
- Verify JSON syntax in the `gallery_images` and `stats` fields

---

## Quick Check Query

After running the migration, use this query to verify everything worked:

```sql
SELECT 
  name,
  slug,
  CASE WHEN hero_image_url IS NOT NULL THEN '✅' ELSE '❌' END as hero,
  CASE WHEN jsonb_array_length(gallery_images) > 0 THEN '✅' ELSE '❌' END as gallery,
  CASE WHEN jsonb_array_length(stats) > 0 THEN '✅' ELSE '❌' END as stats,
  CASE WHEN seo_title IS NOT NULL THEN '✅' ELSE '❌' END as seo
FROM city_neighborhoods
WHERE slug = 'back-bay';
```

All columns should show ✅ if the migration was successful!

