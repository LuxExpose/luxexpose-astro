# Fix: Vercel Building Old Commit

## Problem

Vercel is building commit `e322b99` (old) instead of the latest commit `c645428` (new).

**Error:**
```
Could not resolve "../components/Header.astro" from "src/pages/cities.astro"
```

This is because commit `e322b99` still has the old `Header.astro` import.

## Solution: Force Vercel to Build Latest Commit

### Option 1: Manual Redeploy in Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Navigate to https://vercel.com/dashboard
   - Select your project: `luxexpose-astro`

2. **Go to Deployments Tab**
   - Click on "Deployments" in the left sidebar
   - You should see a list of deployments

3. **Find the Latest Deployment**
   - Look for the deployment with commit `c645428` or `089f65c`
   - If you don't see it, wait a moment for it to appear (it should auto-deploy)

4. **Redeploy Latest**
   - Click the three dots (⋯) next to the latest deployment
   - Select "Redeploy"
   - OR click "Redeploy" button if visible

5. **Verify Build**
   - The new deployment should build commit `c645428`
   - Check the build logs to confirm it's using the correct commit

### Option 2: Check Vercel Git Integration

1. **Go to Project Settings**
   - Vercel Dashboard → Your Project → Settings

2. **Check Git Integration**
   - Go to "Git" section
   - Verify it's connected to: `github.com/LuxExpose/luxexpose-astro`
   - Verify branch is set to: `main`
   - Check "Production Branch" is set to `main`

3. **Reconnect if Needed**
   - If something looks wrong, click "Disconnect"
   - Then reconnect the repository
   - Make sure to select the `main` branch

### Option 3: Trigger via GitHub Webhook

1. **Check GitHub Webhooks**
   - Go to your GitHub repository
   - Settings → Webhooks
   - Verify Vercel webhook is active and recent

2. **Manual Trigger**
   - Make a small change to any file (or use the empty commit we just pushed)
   - Push to `main` branch
   - Vercel should auto-detect and build

## Verification

### Check Latest Commit
```bash
git log --oneline -1
# Should show: c645428 Trigger Vercel rebuild with latest fixes
```

### Verify cities.astro is Correct
```bash
grep "import.*Navbar" src/pages/cities.astro
# Should show: import Navbar from "../components/Navbar.astro";
```

### Check What Vercel Should Build

**Latest commit:** `c645428`  
**Previous fixes:**
- `089f65c` - Fixed Pagination Fragment error
- `5752164` - Added documentation
- `fcfcab4` - Merged remote changes
- `bbca542` - Fixed Navbar env vars
- `315cb49` - Fixed cities.astro to use Navbar

**All these commits have the correct code!**

## Why This Happens

Vercel might be:
1. **Cached on old commit** - Solution: Clear cache and redeploy
2. **Webhook not firing** - Solution: Manually trigger deployment
3. **Branch mismatch** - Solution: Verify branch settings in Vercel
4. **Build queue issue** - Solution: Wait and check again

## Next Steps

1. **Go to Vercel Dashboard NOW**
2. **Manually trigger a redeploy** of the latest deployment
3. **Watch the build logs** to confirm it's building commit `c645428`
4. **Verify the build succeeds**

---

**The code is correct. Vercel just needs to build the latest commit instead of the old one.**

