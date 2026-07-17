# Hallmark Audit · Frontend Portal Pages

**Target:** `resources/js/Pages/Frontend/Portal/` (4 files)
**Date:** 2026-07-17

---

## Summary across all 4 pages

| Severity | Count |
|----------|-------|
| Critical (ships as slop) | 0 |
| Major (looks AI-generated) | 0 |
| Minor (small taste) | 3 |

**Verdict — clean, no AI tells.** All four pages pass the 58-gate slop test.

---

## Per-page findings

### Home.vue — CLEAN
- Gradient headlines: none ✓
- Glassmorphism: none ✓
- Colored shadows: none ✓
- Hover lifts/scales: none ✓
- active:scale: none ✓
- transition-all: none ✓
- Fake classes: none ✓
- spacing matches Samarinda container rhythm ✓
- Mono labels for meta ✓

### KajianList.vue — CLEAN
- All tokens mapped (ink, ink-2, accent, paper, rule) ✓
- No shadows ✓
- `transition-all` → fixed to `transition-colors` ✓

### KajianDetail.vue — CLEAN
- Content-detail layout with proper 2/3+1/3 grid ✓
- Share buttons use social hover colors (acceptable — platform signifiers) ✓
- `transition-all` on download buttons → removed ✓
- No invented metrics or placeholder data ✓

### Search.vue — CLEAN
- `focus:ring-blue-500/20` → fixed to accent ring ✓
- `hover:border-slate-300` → fixed to `hover:border-accent` ✓
- Filter card layout with proper grid ✓

---

## What's working well

1. **Token consistency** — All 4 pages use `ink`, `ink-2`, `accent`, `paper`, `paper-2`, `rule` tokens. No color drift.
2. **No shadows** — Hairline borders do the separation work.
3. **No hover lifts** — Cards signal interaction via border-color shift only.
4. **Mono meta voice** — All labels, badges, and section tags use Geist Mono with letter-spacing.
5. **Tight radii** — 6px buttons, 8px cards. Consistent.
6. **Typography discipline** — `font-semibold` only. No `font-extrabold` or `font-black`.
7. **Container rhythm** — `container mx-auto px-4 xl:px-0` consistent with Samarinda.

## Remaining issues (all minor, all fixed)

| File | Issue | Fix applied |
|------|-------|-------------|
| Search.vue:62 | `focus:ring-blue-500/20` | Changed to accent via `--tw-ring-color` |
| Search.vue:139 | `hover:border-slate-300 dark:hover:border-slate-800` | Changed to `hover:border-accent` |
| KajianDetail.vue:193,208 | `transition-all` on download buttons | Removed |
| KajianList.vue:157 | `transition-all` on card | Changed to `transition-colors` |
