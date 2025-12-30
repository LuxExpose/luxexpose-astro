# City Navbar - Complete Implementation Reference

**Date:** January 2025  
**Purpose:** Complete reference for implementing city-specific navigation bars

## Architecture Overview

The City Navbar consists of **two distinct sections**:

1. **Top Utility Bar** - Hidden on mobile, contains "back to main site" link, theme toggle, search, and notifications
2. **Main Navigation** - City-branded logo, network dropdown, category links, and user menu

## Part 1: Top Utility Bar

### Component: `CityUtilityBar.astro`

**Location:** `src/components/city/CityUtilityBar.astro`

**Props:**
```typescript
interface Props {
  city: 'boston' | 'miami' | 'nyc' | 'doha';
  mainSiteUrl?: string; // Default: '/'
}
```

**Features:**
- Back to main site link (left side)
- Theme toggle button
- Search trigger button
- Notifications bell (optional, for authenticated users)
- Hidden on mobile (`display: none` below 768px)

**Icons Used:**
- ArrowLeft (back link)
- Sun/Moon (theme toggle)
- Search (search trigger)
- Bell (notifications)

**Key CSS:**
- Hidden on mobile: `display: none` with `@media (min-width: 768px)`
- Theme icons toggle based on `.dark` class
- Notification dot shows when active

**JavaScript:**
- Theme toggle with localStorage persistence
- Search trigger dispatches `open-search-dialog` custom event
- Theme icons update on toggle

## Part 2: Main Navigation Bar

### Component: `CityMainNav.astro`

**Location:** `src/components/city/CityMainNav.astro`

**Props:**
```typescript
interface Props {
  city: 'boston' | 'miami' | 'nyc' | 'doha';
  categories: Array<{ name: string; slug: string; path: string }>;
  activeCategorySlug?: string;
}
```

### Data Structures Required

**City Data:**
```typescript
// src/data/cities.ts
export interface City {
  name: string;
  slug: string;
  description: string;
  path: string;
}

export const cities: City[] = [
  { name: 'Boston', slug: 'boston', description: 'Discover luxury in Historic New England', path: '/boston' },
  { name: 'Miami', slug: 'miami', description: 'Experience luxury in the Magic City', path: '/miami' },
  { name: 'New York', slug: 'nyc', description: 'Experience luxury in the Big Apple', path: '/nyc' },
  { name: 'Doha', slug: 'doha', description: 'Where tradition meets infinite ambition', path: '/doha' },
];
```

**Category Configuration:**
```typescript
// Category order for sorting
export const categoryOrder = [
  'automotive', 'aviation', 'beauty', 'events', 'experiences',
  'fashion', 'hotels-resorts', 'lifestyle', 'people', 'real-estate', 'restaurants-venues'
];

// Featured categories shown directly in nav (rest go in "MORE" dropdown)
export const featuredCategorySlugs = ['automotive', 'real-estate', 'restaurants-venues'];
```

**City Color Accent Classes:**
```css
/* In global CSS or component styles */
:root {
  --boston-accent: 345 79% 42%;
  --miami-accent: 174 85% 45%;
  --nyc-accent: 210 100% 40%;
  --doha-accent: 350 79% 38%;
}

.text-boston-accent { color: hsl(var(--boston-accent)); }
.text-miami-accent { color: hsl(var(--miami-accent)); }
.text-nyc-accent { color: hsl(var(--nyc-accent)); }
.text-doha-accent { color: hsl(var(--doha-accent)); }

.border-boston-accent { border-color: hsl(var(--boston-accent)); }
.bg-boston-accent\/10 { background: hsl(var(--boston-accent) / 0.1); }
```

### Main Navigation Features

**Logo Section:**
- City-branded logo with emblem
- Format: "LUX [CITY NAME]" (city name in accent color)
- Tagline: "Part of the Lux Exposé Network"
- Responsive sizing

**Network Dropdown:**
- Shows "Lux Exposé Global" (highlighted)
- Lists other cities in network
- Glass card menu styling
- Hover effects

**Category Links:**
- Featured categories (3) shown as direct links
- Remaining categories in "MORE" dropdown
- Active category highlighted with accent color
- Sorted by predefined `categoryOrder`

**Mobile Menu:**
- Slide-in menu for mobile/tablet
- Shows all categories
- Network links
- Back to main site link
- Dividers for organization

**Right Actions:**
- User menu (desktop only)
- Mobile menu toggle button

### Key Styling Features

**Glass Card Menu:**
```css
.glass-card-menu {
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
}
```

**Active Category:**
```css
.nav-link--active {
  color: hsl(var(--foreground));
  font-weight: 700;
  border-bottom: 2px solid hsl(var(--cityAccent));
}
```

**Dropdown Animation:**
```css
.dropdown-panel {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.3s ease;
}

.nav-dropdown.open .dropdown-panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

## Part 3: Complete Navbar Wrapper

### Component: `CityNavbar.astro`

**Location:** `src/components/city/CityNavbar.astro`

**Props:**
```typescript
interface Props {
  city: 'boston' | 'miami' | 'nyc' | 'doha';
  categories: Array<{ name: string; slug: string; path: string }>;
  activeCategorySlug?: string;
}
```

**Structure:**
```astro
<nav class="city-navbar">
  <CityUtilityBar city={city} />
  <CityMainNav 
    city={city} 
    categories={categories} 
    activeCategorySlug={activeCategorySlug}
  >
    <slot name="user-menu" slot="user-menu" />
  </CityMainNav>
</nav>
```

**Key Features:**
- Sticky positioning (`position: sticky; top: 0`)
- Glass effect with backdrop blur
- Scroll shadow effect
- Z-index: 50 (above content, below modals)

## Implementation Checklist

### Required Files

- [ ] `src/components/city/CityUtilityBar.astro`
- [ ] `src/components/city/CityMainNav.astro`
- [ ] `src/components/city/CityNavbar.astro`
- [ ] Update `src/data/cities.ts` with category configuration

### Required Data

- [ ] City data structure with all 4 cities
- [ ] Category order array
- [ ] Featured category slugs array
- [ ] Categories fetched from Supabase or static data

### Required CSS Variables

- [ ] `--boston-accent` color variable
- [ ] `--miami-accent` color variable
- [ ] `--nyc-accent` color variable
- [ ] `--doha-accent` color variable

### Required Assets

- [ ] `/images/lux-emblem.png` (logo emblem)

## Usage Example

```astro
---
// src/pages/cities/[citySlug].astro
import CityNavbar from '@/components/city/CityNavbar.astro';
import { fetchCategories } from '@/utils/categories';

const { citySlug } = Astro.params;
const categories = await fetchCategories();

// Map categories to include paths
const categoryLinks = categories.map(cat => ({
  name: cat.name,
  slug: cat.slug,
  path: `/${citySlug}/category/${cat.slug}`
}));
---

<Layout>
  <CityNavbar 
    city={citySlug} 
    categories={categoryLinks}
    activeCategorySlug={Astro.url.searchParams.get('category')}
  />
  
  <!-- Rest of page content -->
</Layout>
```

## Technical Notes

| Feature | Implementation |
|---------|---------------|
| Sticky Header | `position: sticky; top: 0; z-index: 50` |
| Glass Effect | `background: hsl(var(--background) / 0.85); backdrop-filter: blur(12px)` |
| Scroll Shadow | Added via `.scrolled` class when `scrollY > 20` |
| City Accent Colors | CSS variables per city (`--boston-accent`, etc.) |
| Category Sorting | Predefined `categoryOrder` array |
| Featured vs Dropdown | First 3 categories shown as direct links, rest in "MORE" dropdown |
| Dropdown Animation | `opacity`, `visibility`, `transform: translateY()` |
| Mobile Menu | Slide-in with `@keyframes fade-in` |

## Responsive Breakpoints

- **Mobile:** < 640px - Utility bar hidden, mobile menu
- **Tablet:** 640px - 1023px - Utility bar visible, mobile menu
- **Desktop:** ≥ 1024px - Full desktop navigation, no mobile menu

## JavaScript Functionality

### Dropdown Toggle
- Click trigger to open/close
- Close on outside click
- Only one dropdown open at a time
- ARIA attributes for accessibility

### Mobile Menu
- Toggle button opens/closes menu
- Menu closes on link click
- Icon switches between menu/close

### Theme Toggle
- Toggles `.dark` class on `<html>`
- Persists to localStorage
- Updates icons based on theme

### Scroll Detection
- Adds `.scrolled` class when `scrollY > 20`
- Triggers shadow effect

## Accessibility Features

- ARIA labels on all buttons
- ARIA expanded states on dropdowns
- Keyboard navigation support
- Focus management
- Screen reader friendly

## Future Enhancements

- Search dialog component integration
- Notification dropdown/popover
- User menu with authentication states
- Category count badges
- Active page highlighting

---

**This reference provides complete implementation details for city-specific navigation bars matching the original site design.**

