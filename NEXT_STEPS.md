# Next Steps - Priority 2

## ✅ Priority 1 Complete
- ✅ Supabase integration for categories
- ✅ Category pages created (`/category/[slug]`)
- ✅ Header/Footer fetch real categories
- ✅ Logo handled (user confirmed it's fine)

## 🎯 Priority 2: Editorial & Search

### Option 1: Editorial Listing Page (`/editorial`)
**What we need:**
- Create `src/pages/editorial.astro`
- Display all editorial articles in a grid/list
- Pagination support
- SEO optimized
- Uses `mobile-api-feed` with `type: 'latest'` or similar

**Questions for Lovable (if needed):**
- Is there a specific endpoint for editorial vs all articles?
- Should editorial page filter by type or just show all articles?

### Option 2: Search Functionality
**What we need:**
- Search UI component (can integrate with existing search button in header)
- Search results page (`/search?q=query`)
- Uses `semantic-search` endpoint
- Can also use `search-suggestions` for autocomplete

**Questions for Lovable (if needed):**
- What's the exact request format for `semantic-search`?
- Should search be a separate page or modal/overlay?
- Any filters we should support?

### Option 3: Article Counts for Categories
**What we need:**
- Update category fetching to include article counts
- Either via new API endpoint or join query

**Note:** Lovable mentioned they can create a `mobile-api-categories` endpoint - we can wait for that or implement counts differently.

## 📋 Recommendation

Let's start with **Option 1: Editorial Listing Page** since it's a core public page that needs SEO.

Should we:
1. Create the editorial page now?
2. Ask Lovable about editorial-specific endpoints first?
3. Work on search functionality instead?




