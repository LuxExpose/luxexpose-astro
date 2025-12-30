# Question for Lovable: Main Homepage Slider Implementation

## Context

We're building a luxury editorial website (Lux Exposé) using **Astro** framework. We currently have a `FeaturedHero.astro` component that displays a single featured article on the homepage. We need to convert this to a **main slider/carousel** that displays multiple featured articles with smooth transitions.

## Current Implementation

### Current Component: `src/components/FeaturedHero.astro`

```astro
---
const { article } = Astro.props;

if (!article) {
  // Safety: if no article is passed, render nothing
}
---

{article ? (
  <section class="relative">
    <!-- Background image -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        src={article.featured_image || "https://luxexpose.com/wp-content/uploads/2023/08/LuxExpose-Logo.png"}
        alt={article.title || "Featured article"}
        class="h-full w-full object-cover opacity-55 scale-105"
        loading="eager"
      />
      <!-- Dark gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/95"></div>
      <!-- Soft gold glow -->
      <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-25"
        style="background: radial-gradient(circle, hsl(var(--luxury-gold)) 0%, transparent 70%);"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative container max-w-6xl mx-auto px-6 pt-28 pb-20">
      <div class="max-w-3xl">
        <p class="mb-5 text-xs uppercase tracking-[0.35em] text-white/55">
          Featured Editorial
        </p>

        <h1 class="font-serif text-4xl md:text-6xl leading-tight text-white">
          {article.title}
        </h1>

        <p class="mt-6 text-lg md:text-xl text-white/75 leading-relaxed">
          {article.excerpt || "Read this featured story on Lux Exposé."}
        </p>

        <div class="mt-10 flex flex-wrap gap-3">
          <a
            href={`/${article.slug}`}
            class="inline-flex items-center rounded-lg bg-[hsl(var(--luxury-gold))] px-7 py-3 text-black font-semibold hover:opacity-90 transition"
          >
            Read Story →
          </a>

          <a
            href="#latest-articles"
            class="inline-flex items-center rounded-lg border border-white/20 px-7 py-3 text-white hover:border-white/40 transition"
          >
            Browse Editorial
          </a>
        </div>
      </div>
    </div>
    <!-- Divider -->
    <div class="relative">
      <div class="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  </section>
) : null}
```

### Current Usage: `src/pages/index.astro`

```astro
---
import FeaturedHero from "../components/FeaturedHero.astro";

let featured: any = null;
let rest: any[] = [];

try {
  const res = await fetch(`${FUNCTIONS_BASE}/mobile-api-feed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "latest", page: 1, limit: 25 }),
  });

  if (res.ok) {
    const data = await res.json();
    const articles = data?.articles ?? [];
    featured = articles[0] ?? null;
    rest = articles.slice(1);
  }
} catch {
  featured = null;
  rest = [];
}
---

<FeaturedHero article={featured} />
```

## What We Need

### 1. Slider/Carousel Component

We need a **main homepage slider** that:
- Displays **3-5 featured articles** in a carousel
- Has **smooth transitions** (fade, slide, or crossfade)
- Shows **navigation arrows** (left/right)
- Shows **dot indicators** for each slide
- **Auto-plays** with pause on hover
- Is **fully responsive** (mobile, tablet, desktop)
- Maintains the **luxury aesthetic** (gold accents, elegant typography)
- Has **keyboard navigation** (arrow keys)
- Has **touch/swipe support** for mobile

### 2. Design Requirements

#### Visual Style
- **Background**: Full-width hero images with dark gradient overlay
- **Typography**: 
  - Serif font (Cormorant Garamond) for headlines
  - Sans-serif (Inter) for body text
  - Large, bold headlines (4xl to 6xl on desktop)
- **Colors**:
  - Gold accent: `hsl(var(--luxury-gold))` (43 35% 48%)
  - White text on dark backgrounds
  - Subtle gold glow effects
- **Layout**:
  - Content max-width: 6xl (1280px)
  - Padding: Responsive (pt-28 pb-20 on desktop)
  - Content positioned left-aligned

#### Each Slide Should Display:
1. **Background Image**: Full-width, with overlay
2. **Badge/Label**: "Featured Editorial" (uppercase, small text)
3. **Headline**: Article title (large serif font)
4. **Excerpt**: Article excerpt or description
5. **CTA Buttons**:
   - Primary: "Read Story →" (gold background)
   - Secondary: "Browse Editorial" (outlined)
6. **Divider**: Subtle gradient line at bottom

### 3. Technical Requirements

#### Framework: Astro
- Component should be an `.astro` file
- Fetch data at build time (SSG)
- Use client-side JavaScript for interactivity
- No external dependencies (prefer vanilla JS or lightweight library)

#### Data Structure
Articles come from Supabase API with this structure:
```typescript
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  // ... other fields
}
```

#### Performance
- **Lazy load** images (except first slide)
- **Optimize** images (use Astro Image component if available)
- **Smooth animations** (60fps)
- **Accessible** (ARIA labels, keyboard navigation)

### 4. Specific Questions

1. **What's the best approach for a slider in Astro?**
   - Vanilla JavaScript?
   - Lightweight library (Swiper, Glide.js)?
   - Custom implementation?

2. **How should we handle image loading?**
   - Preload first slide?
   - Lazy load subsequent slides?
   - Use Astro's Image component?

3. **What animation style works best for luxury sites?**
   - Fade transitions?
   - Slide transitions?
   - Crossfade?
   - Parallax effects?

4. **How should auto-play work?**
   - Default interval (5-7 seconds)?
   - Pause on hover?
   - Pause on interaction?
   - Respect prefers-reduced-motion?

5. **What's the best responsive approach?**
   - Show fewer slides on mobile?
   - Different layout on mobile?
   - Touch gestures?

6. **How should we handle accessibility?**
   - ARIA live regions?
   - Focus management?
   - Screen reader announcements?

## Expected Output

Please provide:

1. **Complete Astro component** (`HeroSlider.astro` or `MainSlider.astro`)
   - Props interface
   - Data fetching logic
   - HTML structure
   - CSS styles
   - JavaScript for interactivity

2. **CSS styles** (can be in component or separate file)
   - Responsive breakpoints
   - Animations/transitions
   - Navigation arrows
   - Dot indicators
   - Hover states

3. **JavaScript functionality**
   - Slide navigation
   - Auto-play
   - Touch/swipe support
   - Keyboard navigation
   - Accessibility features

4. **Usage example**
   - How to use in `index.astro`
   - How to fetch and pass data
   - Any configuration options

## Design Inspiration

The slider should feel:
- **Luxurious** and **elegant**
- **Smooth** and **polished**
- **Professional** and **refined**
- Similar to high-end editorial sites (Vogue, Architectural Digest, etc.)

## Additional Notes

- We're using **Tailwind CSS** for styling
- CSS variables are defined in `global.css` (--luxury-gold, etc.)
- Fonts: Cormorant Garamond (serif), Inter (sans-serif)
- The site has dark mode support
- We want to maintain consistency with the existing navbar design

## Current CSS Variables Available

```css
:root {
  --luxury-gold: 43 35% 48%;
  --luxury-gold-light: 43 50% 65%;
  --luxury-gold-dark: 43 30% 35%;
  --background: 30 5% 10%;
  --foreground: 0 0% 98%;
  /* ... other variables */
}
```

---

**Please provide a complete, production-ready slider component that we can drop into our Astro project!**

