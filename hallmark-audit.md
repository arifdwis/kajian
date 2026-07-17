# Hallmark Audit · SIKAJIAN (BAPPERIDA Samarinda)

**Target:** `kajian/` — Sistem Informasi Kajian dan Riset
**Stack:** Laravel 13 + Vue 3 + Inertia + Tailwind CSS + PrimeVue
**Date:** 2026-07-17

---

## Critical (ships as slop)

### Gradient headline — `resources/js/Pages/Frontend/Portal/Home.vue:39`
"Riset & Kajian Kebijakan" headline uses `bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`.
→ Solid ink. Weight or display face carries emphasis, not a gradient fill.

### Centred gradient hero + blur orbs — `Home.vue:27-85`
Full-width gradient background (`from-blue-50/50 via-white to-slate-50`), centred everything, blur-3xl orbs, one sentence + search CTA.
→ Let hero be height of its content. Bias left. Put more than a sentence.

### Fake Tailwind classes — 55 occurrences across 20+ files
`slate-850`, `slate-350`, `gray-105`, `gray-150`, `blue-650`, `slate-250`, `border-slate-850` — none exist in Tailwind v3 scale.
→ Use valid Tailwind scale values or extend theme in `tailwind.config.js`. These silently produce no style.

### Font conflict (3 fonts, no pairing) — `tailwind.config.js:19` + `resources/views/app.blade.php`
Tailwind says Figtree; HTML also loads Inter + Outfit from Google Fonts. Only Figtree is actually used by Tailwind. No display/body pairing.
→ Pick one pair: Outfit (display) + Figtree (body). Drop Inter to eliminate the redundant request.

### AI nav (public) — `resources/js/Layouts/FrontendLayout.vue:25-97`
Sticky, glassmorphism (`bg-white/70 backdrop-blur-md`), logo-left, 3 links centre, dark-mode toggle + CTA-button right, border-bottom. The canonical LLM nav shape.
→ Pick N5 (floating pill) or N6 (masthead). Let the genre shape the nav.

### AI footer (public) — `FrontendLayout.vue:105-140`
3 columns (brand blurb + quick links + contact), faint border-top, centred copyright tail. The generic SaaS footer.
→ Use Ft5 (Statement) or Ft6 (Letter close). A government portal doesn't need a "Quick Links" column on every page.

### Pure black PrimeVue primary — `resources/js/datatable.js`
Primary palette set to `#000000` for the PrimeVue preset. Pure black reads synthetic.
→ Tint toward the existing blue-600 anchor hue instead of pitch black.

### Gradient logo (icon + text) — `FrontendLayout.vue:31-35`
Both "SK" icon and "SIKAJIAN" wordmark use `from-blue-600 to-indigo-600 bg-clip-text text-transparent`.
→ Solid ink on the wordmark. Keep the gradient only on the icon mark if at all.

### Gradient hero backgrounds (multiple pages) — `Home.vue:27`, `KajianList.vue`, etc.
Repeated `bg-gradient-to-b from-blue-50/50 via-white to-slate-50` pattern across public pages.
→ Pick one solid surface per section. Gradients on every section head reads as a template.

---

## Major (looks AI-generated)

### Icon-tile feature card — `Home.vue:94-113`
Rounded-3xl card, icon in blue circle top-left, heading below, two-line description. 4-column grid. The universal feature card template.
→ Vary column widths (2-4-2, 3-2-3). Mix card heights. Pull icon inline with heading. Or drop icons entirely.

### Glassmorphism without purpose — `FrontendLayout.vue:25`
`bg-white/70 backdrop-blur-md` on the sticky navbar. Decorative glass with no semantic depth.
→ Glass works when it reveals content behind it. A navbar has nothing behind — use solid bg or a hairline border.

### Coloured shadow glow — `Home.vue:60`, `FrontendLayout.vue:31`, and many more
`shadow-md shadow-blue-500/10`, `shadow-lg shadow-blue-500/20` — coloured halos on light-mode cards and buttons.
→ Use neutral shadows on light mode. On dark mode, use brightness (lighter surface = higher elevation) not glow.

### Universal hover lift — `Home.vue:99`, `FrontendLayout.vue:81`, and throughout
`hover:-translate-y-1` on every card, `active:scale-[0.98]` on every button, `group-hover:scale-105` on logo.
→ Pick one signal per element. A translate + shadow + scale on the same element is three micro-tells in one.

### AOS scroll animations — `package.json` (aos dependency)
Animate-on-scroll library installed for universal scroll-triggered fade-ups.
→ One orchestrated entrance on first load. Let the rest just be there.

### Confirmation modal for every action — `resources/js/Components/ConfirmModal.vue`
Generic modal "Apakah Anda yakin?" with 4 icon variants. No optimistic undo pattern.
→ Optimistic delete + 5s Undo toast. Reserve modal only for truly irreversible actions.

### `transition-all` on interactive elements — `Home.vue:60` and throughout
`active:scale-[0.98] transition-all` — animates every property, including ones that should be instant (focus rings, visibility).
→ `transition: transform 100ms var(--ease-out)` — name the specific properties.

### Admin nav (sidebar + top bar) — `Layouts/Partials/Navbar.vue` + `Sidebar.vue`
Sidebar rail + fixed topbar with search + profile dropdown. Standard admin template shape — no identity beyond the blue gradient.
→ Give the admin UI a distinct structural fingerprint. Asymmetric sidebar, floating header, or embedded navigation.

### No design token file — project root
Colors hardcoded as Tailwind class strings across dozens of `.vue` files. No `tokens.css`, `design.md`, or style guide.
→ Extract a token set. Even a single `tokens.css` file prevents palette drift between pages.

### Colour palette mismatch — Tailwind UI vs PrimeVue preset
Frontend uses `blue-600`/`indigo-600` throughout; PrimeVue preset primary is `#000000`. Admin buttons will be black, not blue.
→ Settle on one primary. Extend the Tailwind palette into the PrimeVue preset, or align the preset to blue-600.

---

## Minor (small taste issues)

### Non-standard z-index — `ConfirmModal.vue:53`
`z-[100]` — arbitrary value, not part of a named scale.
→ Use `z-50` (the highest standard Tailwind z-index) or define a modal layer in the theme.

### `text-slate-850` hardcoded — 20+ files
This non-existent class is used as a primary heading colour. Falls through to default (likely `inherit` or black).
→ Replace with `text-slate-800` or `text-slate-900` and verify dark mode pair.

### Mismatched dark mode strategies
`FrontendLayout.vue` uses JS-based `classList.toggle('dark')`; `Navbar.vue` duplicates the same logic. Two sources of truth for one toggle.
→ Centralise dark mode state in a composable or Pinia store.

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 9 |
| Major | 10 |
| Minor | 3 |

**Verdict — reads as AI-generated (multiple critical tells confirmed)**

The Laravel backend is solid — services, observers, policies, migrations, form requests — but the UI layer carries every signature of generated code: gradient headlines, 55+ non-existent Tailwind classes, glassmorphism, coloured shadow glows, universal hover lifts, and two colour systems fighting each other. The nav and footer are the canonical LLM templates.

**Top 5 fixes:**
1. Replace all 55+ fake Tailwind classes with valid scale values
2. Pick one colour system (blue-600 primary, not black)
3. Choose one font pair (Outfit + Figtree), drop Inter
4. Remove gradient fills from headlines, logos, and hero backgrounds
5. Replace AI nav/footer archetypes with genre-appropriate alternatives
