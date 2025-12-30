# Vercel Deployment Error - Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Missing

**Problem:** Vercel needs environment variables set in the dashboard.

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   - `PUBLIC_SUPABASE_URL` = `https://ppmdgygupuzthqxfippv.supabase.co`
   - `PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

**Check in code:**
- `src/components/Navbar.astro` uses `import.meta.env.PUBLIC_SUPABASE_URL`
- Make sure these are set in Vercel dashboard

### 2. Build Configuration Issues

**Current config (`astro.config.mjs`):**
```javascript
export default defineConfig({
  output: "server",  // ✅ Correct for Vercel
  adapter: vercel(), // ✅ Correct
  integrations: [tailwind()],
});
```

**Verify:**
- `@astrojs/vercel` is installed (✅ in package.json)
- `output: "server"` is set (✅ correct)

### 3. Missing Dependencies

**Check `package.json`:**
- All dependencies should be in `dependencies` (not devDependencies) for production builds
- Current setup looks correct

### 4. TypeScript Errors

**Check for:**
- Type errors in components
- Missing type definitions
- Import errors

### 5. Build Script Issues

**Current build script:**
```json
"build": "astro build"
```

This is correct. Vercel should automatically detect Astro and run this.

## Steps to Fix

### Step 1: Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Check the "Build Logs" tab
4. Look for specific error messages

### Step 2: Verify Environment Variables

```bash
# In Vercel Dashboard → Settings → Environment Variables
PUBLIC_SUPABASE_URL=https://ppmdgygupuzthqxfippv.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Test Build Locally

```bash
# Set environment variables
export PUBLIC_SUPABASE_URL="https://ppmdgygupuzthqxfippv.supabase.co"
export PUBLIC_SUPABASE_ANON_KEY="your_key_here"

# Try building
npm run build
```

### Step 4: Check for Syntax Errors

Common issues:
- Unclosed HTML tags
- Missing closing braces in JavaScript
- TypeScript type errors
- Import path errors

### Step 5: Verify Node Version

Vercel should auto-detect, but you can specify in `package.json`:

```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Quick Fixes to Try

### Fix 1: Add vercel.json (if needed)

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Fix 2: Ensure Environment Variables are Public

In Astro, environment variables must be prefixed with `PUBLIC_` to be available in the browser:
- ✅ `PUBLIC_SUPABASE_URL`
- ✅ `PUBLIC_SUPABASE_ANON_KEY`
- ❌ `SUPABASE_URL` (won't work in browser)

### Fix 3: Check for Hardcoded URLs

Make sure all API calls use environment variables, not hardcoded URLs.

## Most Likely Issues

Based on the codebase:

1. **Missing Environment Variables in Vercel** (Most Common)
   - Solution: Add `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` in Vercel dashboard

2. **Build Time Fetch Failures**
   - The Navbar component fetches data at build time
   - If Supabase is unreachable, build might fail
   - Solution: Add error handling (already present ✅)

3. **TypeScript Errors**
   - Check if all types are properly defined
   - Solution: Run `npm run build` locally to catch errors

## Next Steps

1. **Check Vercel build logs** for the specific error message
2. **Verify environment variables** are set in Vercel dashboard
3. **Test build locally** with environment variables set
4. **Share the specific error message** from Vercel logs for more targeted help

## How to Get Specific Error

1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Copy the error message from "Build Logs"
4. Share it for specific troubleshooting

---

**Note:** Without the specific error message from Vercel, these are the most common issues and solutions. The actual error log will help pinpoint the exact problem.

