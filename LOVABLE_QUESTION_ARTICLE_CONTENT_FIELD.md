# Question for Lovable: Article Content Field Name

## Issue
We're trying to display article content on the article page (`/[slug].astro`), but the article body text is not showing. We're using the `mobile-api-article` endpoint and need to know which field contains the article body/content HTML.

## Current Implementation
We're currently checking these fields in order:
1. `article.content_html`
2. `article.body_html`
3. `article.body`
4. `article.content` (as string)
5. `getContentHtml(article.content)` (for TipTap JSON)

But none of these seem to be returning content for the article.

## Questions

1. **What is the exact field name** that contains the article body/content HTML in the `mobile-api-article` endpoint response?

2. **What is the data type** of the content field?
   - Is it a plain HTML string?
   - Is it TipTap JSON that needs to be converted?
   - Is it stored in a different format?

3. **Example article to test**: `give-your-home-bar-a-makeover-with-these-five-gorgeous-bottles`
   - Can you confirm what field contains the content for this article?

4. **Do we need to query a different endpoint** or make additional API calls to get the article content?

## Current Code
```typescript
// In src/pages/[slug].astro
const response = await fetch(`${FUNCTIONS_BASE}/mobile-api-article`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slug, includeRelated: true }),
});

const payload = await response.json();
const article = payload?.article;

// What field should we use here?
const contentHtml = article.content_html || article.content || ...?
```

## Additional Context
- The article metadata (title, excerpt, featured_image, etc.) is loading correctly
- Only the body content is missing
- We're using Astro static site generation
- Both projects (Lovable React and Astro) use the same Supabase database

---

**Please provide**: The exact field name(s) we should check for article content, and if possible, an example of what the content field looks like for a typical article.

