# Checkpoint Commit Workflow

## Goal
Prevent loss of work by creating automatic safety commits.

## Rule
Whenever files are edited successfully and no errors are present, create a lightweight checkpoint commit.

## Implementation

### When to Create Checkpoint Commits

**After completing a logical change:**
- File saved successfully
- Error fixed
- Feature added
- Build passes

**Specific triggers:**
- ✅ After fixing a build error
- ✅ After adding/removing imports
- ✅ After modifying config files (astro.config, package.json, supabase.ts)
- ✅ After successful local or CI build
- ✅ After completing a component implementation
- ✅ After fixing TypeScript/compilation errors

### When NOT to Auto-Commit

**Never auto-commit if:**
- ❌ The build is currently failing
- ❌ Files contain syntax errors
- ❌ The user explicitly says "do not commit yet"
- ❌ In the middle of an incomplete refactor
- ❌ Tests are failing

## Commit Format

```bash
git add .
git commit -m "checkpoint: auto-save"
git push
```

**Note:** These commits are allowed to be frequent and messy. They are NOT final commits — they are safety checkpoints. The user will clean history later if desired.

## Expected Result

- ✅ No work is ever lost
- ✅ GitHub always has a recent recoverable state
- ✅ Vercel can always redeploy a known-good version
- ✅ Easy to revert to last working state
- ✅ Safety net for experimental changes

## Workflow Example

1. User: "Fix the navbar dropdown"
2. AI: Makes changes, fixes errors
3. AI: Verifies no linter errors
4. AI: Creates checkpoint commit
5. AI: Continues with next task

## Recovery

If something goes wrong:
```bash
# View recent commits
git log --oneline -10

# Revert to last checkpoint
git reset --hard <checkpoint-commit-hash>

# Or revert specific file
git checkout <checkpoint-commit-hash> -- <file-path>
```

---

**This workflow ensures work is never lost and provides safety checkpoints throughout development.**

