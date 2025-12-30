# Questions for Lovable - Priority 2: Editorial Page & Search

## Question 1: Editorial Listing Page

We're creating the `/editorial` page to list all editorial articles.

**Questions:**
1. Should the editorial page show:
   - ALL articles (just use `mobile-api-feed` with `type: 'latest'`)?
   - OR only articles marked as "editorial" type (is there a filter we should use)?

2. Is there any difference between articles shown on homepage vs editorial page?
   - Same articles or different filtering logic?

3. Should we use pagination? If yes, what's the recommended page size?

## Question 2: Search Functionality

We're implementing search using the `semantic-search` endpoint.

**Questions:**
1. Can you provide the exact request/response format for `semantic-search`?
   - Example request body structure
   - Example response structure
   - Any required vs optional parameters?

2. What's the difference between:
   - `semantic-search` - full search results?
   - `search-suggestions` - autocomplete suggestions?
   
   Should we use both? (suggestions for autocomplete, semantic-search for results page?)

3. What filters are available in `semantic-search`?
   - We know about `categoryId` - are there others? (date range, tags, etc.)

## Question 3: Category Article Counts

**Questions:**
1. For displaying article counts in category dropdowns (header/footer), should we:
   - Wait for the new `mobile-api-categories` endpoint you mentioned?
   - OR use a different approach (join query, separate count endpoint)?

2. If we should wait for `mobile-api-categories`, any timeline on when it will be available?

---

**Context:** Building public-facing pages in Astro with full SEO. Editorial page and search are next priorities.




