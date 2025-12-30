# Boston Page Background - Detailed Question for Lovable

## Current Issue
The Boston page (`/boston`) appears too dark and does not match the live site at https://luxexpose.com/boston. We need detailed specifications to match the exact background appearance.

## What We Need to Know

### 1. Base Background Color
- **Question**: What is the exact background color used on the live Boston page?
  - Is it `hsl(30, 5%, 10%)` = `#1a1918` (warm dark charcoal)?
  - Or is it a different shade/value?
  - Is there a gradient applied to the base background?

### 2. Background Layers & Stacking Order
Please provide the complete layer structure from bottom to top:

**Layer 1: Base Background**
- Color/Value: ?
- CSS property: `background-color` or `background`?
- Applied to: `body`, `html`, or a wrapper div?

**Layer 2: Ambient Effects (CityAmbience Component)**
- Floating Orb (top-right):
  - Position: `top: 25%; right: -25%`?
  - Size: `600px × 600px`?
  - Blur: `48px` or different?
  - Colors: Burgundy/Navy gradient at what opacity?
  - Opacity: `0.3` or different?
  - Animation: `float 6s` with `-20px translateY`?

- Pulse Accent Orb (bottom-left):
  - Position: `bottom: 25%; left: 25%`?
  - Size: `384px × 384px`?
  - Blur: `40px`?
  - Color: Gold at what opacity?
  - Opacity range: `0.3 → 0.6`?

- Shimmer Overlay:
  - Color: Gold `rgba(184, 134, 11, 0.1)`?
  - Size: `1000px` width?
  - Duration: `3s`?
  - Opacity: `0.2`?

**Layer 3: Hero Gradient Overlay**
- Applied to hero section only?
- Gradient: `hsla(345, 79%, 31%, 0.05)` at top, transparent at 50%?

### 3. Visual Comparison
**Current Implementation:**
- Base: `hsl(30, 5%, 10%)` = `#1a1918`
- Ambient effects: 3 layers (orb, pulse, shimmer)
- Hero overlay: Boston burgundy gradient

**Live Site Appearance:**
- What does the background actually look like?
- Is it lighter/darker than `#1a1918`?
- Are the ambient effects more/less visible?
- Is there additional lighting or color that we're missing?

### 4. CSS Variables & Tailwind Classes
**Question**: What exact CSS variables and Tailwind classes are used on the live Boston page?

- Base wrapper: `bg-background`, `bg-gradient-subtle`, or custom class?
- Body/HTML: Any background applied?
- City-specific classes: `boston-city-theme` or similar?

### 5. Opacity & Blending
**Question**: What blend modes or opacity values are used?

- Are ambient effects using `mix-blend-mode`?
- Are there multiple overlapping gradients?
- What is the overall brightness/lightness of the page?

### 6. Specific Color Values
Please provide exact HSL/RGB/Hex values for:

- Base background color
- Floating orb colors (burgundy, navy)
- Pulse accent color (gold)
- Shimmer color
- Any other background colors

### 7. Component Structure
**Question**: What is the exact HTML/CSS structure on the live Boston page?

```html
<!-- What is the actual structure? -->
<body class="?">
  <div class="?"> <!-- Page wrapper -->
    <div class="?"> <!-- Ambient effects container -->
      <!-- Orb 1 -->
      <!-- Orb 2 -->
      <!-- Shimmer -->
    </div>
    <!-- Hero section with overlay -->
    <!-- Rest of content -->
  </div>
</body>
```

### 8. Screenshot/Reference
**Question**: Can you provide:
- A screenshot of the live Boston page background
- The computed CSS values from browser DevTools
- Any design system tokens or color palette documentation

### 9. Differences from Homepage
**Question**: How does the Boston page background differ from the homepage?

- Homepage uses: `bg-glass-option-9` (blue-tinted)
- Boston page uses: Warm charcoal with burgundy/navy/gold accents
- Are there any shared elements or completely different?

### 10. Testing & Verification
**Question**: What should we check to verify we've matched it correctly?

- Specific color picker values from the live site?
- Opacity levels visible in DevTools?
- Animation speeds/timing?
- Overall visual brightness/contrast?

## Current Implementation Files

1. **Base Background**: `src/styles/global.css` - `--background: 30 5% 10%`
2. **Page Wrapper**: `src/pages/boston.astro` - `bg-background` class
3. **Ambient Effects**: `src/components/city/CityAmbience.astro`
4. **Hero Overlay**: `src/components/city/CityHeroSection.astro`

## What We've Already Implemented

✅ Base background: `hsl(30, 5%, 10%)` = `#1a1918`
✅ Floating orb: 600px, 48px blur, burgundy/navy gradient
✅ Pulse accent: 384px, 40px blur, gold color
✅ Shimmer: Gold gradient, 1000px width, 3s duration
✅ Hero overlay: Boston burgundy gradient

## What Might Be Wrong

❓ Base color might be too dark (should be lighter?)
❓ Ambient effects might be too subtle (should be more visible?)
❓ Missing additional background layers?
❓ Wrong opacity values?
❓ Missing blend modes or filters?
❓ Wrong color values entirely?

## Request for Lovable

Please provide:
1. **Exact color values** (HSL/RGB/Hex) for all background elements
2. **Complete CSS** for the background layers
3. **Screenshot or visual reference** of what it should look like
4. **DevTools computed values** from the live site
5. **Any design tokens or documentation** that specifies these values

Thank you!

