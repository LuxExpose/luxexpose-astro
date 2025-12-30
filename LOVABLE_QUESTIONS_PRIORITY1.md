hat # Questions for Lovable - Priority 1: API Endpoints & Logo Image

## Question 1: API Endpoint Details

We're building a hybrid setup where Astro handles public pages (homepage, articles) while Lovable handles CMS/admin. We need to understand the complete API structure:

**Current endpoints we're using:**
- `mobile-api-feed` - fetches article feed/list
- `mobile-api-article` - fetches single article by slug

**Questions:**
1. **Category Endpoints:**
   - Is there an endpoint to fetch articles by category? (e.g., `mobile-api-category`, `mobile-api-feed?category=slug`, etc.)
   - What endpoint can we use to get the categories list for header/footer dropdowns?

2. **Article Slug Format:**
   - What format should we use when fetching articles? 
   - Example: If an article URL is `/luxury-watch-review`, do we pass just `"luxury-watch-review"` or the full path `/luxury-watch-review` to `mobile-api-article`?
   - Are slugs unique globally or scoped to categories?

3. **Available Endpoints:**
   - Are there any other endpoints we should know about for public pages?
   - Search functionality endpoint?
   - Archive/pagination endpoints?

## Question 2: Logo Image File

We need the logo image file to complete the header:

**Questions:**
1. Where is the `lux-logo.png` file located in the Lovable project?
   - Is it in `src/assets/` or `public/images/` or elsewhere?
2. Can you provide/export the logo image file so we can add it to our Astro project at `public/images/lux-logo.png`?
3. Are there different logo variations we should know about? (dark mode, light mode, different sizes?)

---

**Context:** We're recreating the public-facing pages in Astro for SEO/social sharing while keeping CMS functionality in Lovable. Both will use the same Supabase backend.




