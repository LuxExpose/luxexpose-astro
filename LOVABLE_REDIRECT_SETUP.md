# Lovable Route Redirects Setup

## Overview
This document explains how routes that are managed in Lovable (not in Astro) are handled via redirects.

## Implementation

### Configuration File
`src/utils/lovableRoutes.ts` - Central configuration for all routes that should redirect to Lovable.

**To add a new route:**
1. Add the route path to the `LOVABLE_ROUTES` array
2. Create a new file in `src/pages/` with the route name (e.g., `src/pages/your-route.astro`)

### Redirect Pages
Each route that should redirect to Lovable needs its own page file in `src/pages/`:

- `src/pages/community.astro` - Redirects `/community` → `https://luxexpose.com/community`
- `src/pages/forums.astro` - Redirects `/forums` → `https://luxexpose.com/forums`

### How It Works

1. **User clicks a link** in the Astro site (e.g., `/community`)
2. **Astro route handler** (`src/pages/community.astro`) intercepts the request
3. **Returns a 301 Permanent Redirect** to `https://luxexpose.com/community`
4. **Browser follows redirect** and loads the Lovable-hosted page

### Adding New Redirects

**Example: Adding `/directory` redirect**

1. Update `src/utils/lovableRoutes.ts`:
```typescript
export const LOVABLE_ROUTES = [
  "/community",
  "/forums",
  "/directory",  // Add here
] as const;
```

2. Create `src/pages/directory.astro`:
```astro
---
import { getLovableUrl } from "../utils/lovableRoutes";

const redirectUrl = getLovableUrl("/directory");

return new Response(null, {
  status: 301,
  headers: {
    Location: redirectUrl,
  },
});
---
```

3. Rebuild the site - the redirect will be active!

### Current Redirects

- `/community` → `https://luxexpose.com/community`
- `/forums` → `https://luxexpose.com/forums`

### Notes

- **301 (Permanent Redirect)**: Used because these routes will always redirect to Lovable
- **SEO-friendly**: Search engines understand 301 redirects and update their index
- **User-friendly**: Seamless redirect - users don't notice they've been redirected to a different domain
- **Maintainable**: All redirect routes are centralized in `lovableRoutes.ts`

