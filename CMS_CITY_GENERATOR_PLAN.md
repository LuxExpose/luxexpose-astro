# CMS City Generator Implementation Plan

## Overview
Create a web-based CMS interface (like Lovable) for adding cities to Lux Exposé. This will be a form-based admin interface that generates all necessary files and database entries.

## Architecture Options

### Option 1: Astro API Routes + GitHub API (Recommended)
**How it works:**
- Admin form at `/admin/add-city`
- Form submits to Astro API route `/api/generate-city`
- API route:
  - Validates input
  - Creates Supabase location entry
  - Generates code files
  - Creates GitHub PR with changes
- User reviews PR and merges

**Pros:**
- Full automation
- Code review before merge
- No direct repo access needed
- Works with static hosting

**Cons:**
- Requires GitHub API setup
- More complex implementation

### Option 2: Astro API Routes + Code Download
**How it works:**
- Admin form at `/admin/add-city`
- Form submits to Astro API route `/api/generate-city`
- API route:
  - Validates input
  - Creates Supabase location entry
  - Generates code files
  - Returns downloadable ZIP or code snippets
- User manually adds files to repo

**Pros:**
- Simpler implementation
- No GitHub API needed
- User has full control

**Cons:**
- Manual file addition required
- More steps for user

### Option 3: Database-First + Build-Time Generation
**How it works:**
- Admin form saves city data to Supabase `city_configs` table
- Build process reads from database and generates files
- Files are generated at build time, not runtime

**Pros:**
- Simple admin interface
- No file generation complexity
- All data in database

**Cons:**
- Requires build process changes
- Less flexible for code structure

## Recommended: Option 1 (GitHub API)

## Implementation Steps

### Phase 1: Admin Interface
1. Create `/admin/add-city` page with form
2. Add form validation
3. Add authentication check
4. Style to match site design

### Phase 2: API Route
1. Create `/api/generate-city` API route
2. Validate form input
3. Generate code files (in memory)
4. Create Supabase location entry
5. Create GitHub PR with changes

### Phase 3: GitHub Integration
1. Set up GitHub App or Personal Access Token
2. Implement PR creation logic
3. Handle file updates (new files + existing file modifications)

### Phase 4: User Experience
1. Show preview of generated code
2. Show PR link after creation
3. Add success/error messages
4. Add loading states

## File Structure

```
src/
  pages/
    admin/
      add-city.astro          # Admin form page
    api/
      generate-city.ts        # API route for city generation
  components/
    admin/
      CityForm.astro          # Reusable city form component
      CodePreview.astro       # Code preview component
  utils/
    github/
      createPR.ts             # GitHub API integration
      generateFiles.ts        # File generation logic
    city/
      validateCity.ts         # City data validation
```

## Required Environment Variables

```env
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=luxexpose-astro
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=your_admin_password (simple auth)
```

## Form Fields

### Step 1: Basic Information
- City slug (required, validated)
- City name (required)
- Full name (e.g., "Lux London")
- Description (required)
- Country (required)
- State/Province (optional)

### Step 2: SEO & Keywords
- Keywords (comma-separated)
- Meta title (optional, auto-generated)
- Meta description (optional, auto-generated)

### Step 3: Copywriting
- Hero tagline
- Hero subtext
- Exploration headline
- Exploration subtext
- Category intro
- Experience callout

### Step 4: Stats
- Add 4-6 statistics
- Each: Label, Value, Icon (optional)

### Step 5: Neighborhoods
- Add 1-6 neighborhoods
- Each: Name, Description, Slug

### Step 6: Map & Location
- Map center latitude
- Map center longitude
- (Optional) Map locations

### Step 7: Review & Generate
- Preview all information
- Preview generated code
- Generate button

## API Route Implementation

```typescript
// src/pages/api/generate-city.ts
export async function POST({ request }) {
  // 1. Authenticate request
  // 2. Validate input
  // 3. Check slug uniqueness
  // 4. Create Supabase location
  // 5. Generate files
  // 6. Create GitHub PR
  // 7. Return PR link
}
```

## GitHub PR Structure

The PR will include:
- New file: `src/data/cities/[city-slug].ts`
- New file: `src/pages/[city-slug].astro`
- Modified: `src/data/cities/index.ts` (add imports/exports)
- Modified: `src/utils/cityConfig.ts` (add city config)

## Authentication

Simple approach:
- Environment variable `ADMIN_PASSWORD`
- Form includes password field
- API route validates password

Better approach:
- Supabase Auth
- Role-based access
- User management

## Next Steps

1. **Ask Lovable** for their implementation details (see `LOVABLE_QUESTION_CMS_CITY_GENERATOR.md`)
2. **Create admin page** with form
3. **Create API route** for generation
4. **Set up GitHub integration**
5. **Test end-to-end workflow**




