# Hallmark Study · SIKAJIAN (BAPPERIDA Samarinda)

**Mode:** Project analysis (local codebase)
**Date:** 2026-07-17
**Studied:** yes

---

## Diagnosis Report

SIKAJIAN is a government research repository with two distinct design systems living side by side: a **public portal** (hero + search + listing + detail) and an **admin panel** (dashboard + CRUD tables + sidebar). They share colour primaries but differ in layout architecture, component density, and visual tone.

---

### Macrostructure

**Public Portal — Home: `Hero-Led Portal`**
- Full-width gradient hero → stats bar → category grid → recent/popular split layout
- Search is the primary interaction (hero-level CTA)
- Sections: Hero · Stats · Category Grid · Recent Publications · Popular Sidebar

**Public Portal — Detail: `Content-Detail (2/3 + 1/3)`**
- Back link → title + badge → metadata grid (4-col) → abstract → sections → sidebar (cover, files, share, related)
- Content hierarchy: judul → metadata → ringkasan → temuan → rekomendasi

**Public Portal — Listing: `Filter + Index`** (KajianList, Search)
- Filter card top → results grid below
- Cards with cover thumbnail + title + metadata + badges

**Admin — Dashboard: `Stat-Led`**
- Welcome banner → 4 KPI cards (row) → charts row (line + bar + donut) → recent tables
- Three variants: Super Admin (all data), Operator (bidang-scoped), ASN (personal)

**Admin — CRUD: `Standard Filter + Table`**
- Filter/search card → DataTable (PrimeVue) → pagination → action buttons
- Consistent across all master data (Bidang, JenisKajian, KataKunci, Tahun) and settings (Users, Roles, Permissions)

---

### Archetypes

| Archetype | Public Portal | Admin Panel |
|-----------|--------------|-------------|
| **Nav** | N1b-variant: Sticky glassmorphism, logo-left, 3 links centre, dark-mode toggle + CTA right | N3 Side-rail (collapsible, w-64↔w-16) + fixed top bar (search + profile dropdown) |
| **Footer** | Ft3-variant: 3-column (brand + links + contact), copyright tail | Ft4 Dense colophon: single-line copyright, minimal |
| **Hero** | Search-centric: gradient bg, blur-3xl orb, headline, subtitle, search bar, stats row | Welcome banner: gradient bg, greeting, user name, brief |
| **CTA** | Blue-600 filled button, rounded-xl, shadow, active:scale-[0.98] | Same button system across both portals |
| **Cards** | Rounded-3xl, white bg, border-slate-200/50, shadow-sm, hover:-translate-y-1 | Same card shape but less hover animation |

**Feature sections:**
- Home: 4-column icon-tile grid (bidang OPD) — icon in blue-50 square, heading, line-clamp-2 body
- Recent: 2-column card grid with badge + title + summary + footer metadata
- Popular: single-column list with icon + title + metadata + download count

**Detail page sections:**
- Metadata grid (4-col: tahun, bidang, jenis, penulis)
- Ringkasan, Latar Belakang, Tujuan, Metodologi, Temuan, Rekomendasi — stacked sections with labelled headings
- Sidebar: cover image, file download buttons, share links, related kajian

---

### Type Pairing

| Role | Face | Usage |
|------|------|-------|
| Declared (Tailwind) | **Figtree** | `font-sans` default — all body text, headings, UI |
| Loaded (unused) | **Inter** | Google Fonts import in `app.blade.php` — loaded but never referenced |
| Loaded (unused) | **Outfit** | Google Fonts import in `app.blade.php` — loaded but never referenced |
| Mono | None | No monospace face declared. Code/log snippets fall back to default monospace |

**Verdict:** Single-font system (Figtree serves both display and body roles). Two extraneous font requests (Inter, Outfit) that never render.

**Size scale:**
- Display: `text-4xl sm:text-6xl font-extrabold` (hero headline)
- H2: `text-2xl font-extrabold`
- H3: `text-xl font-bold`
- H4: `text-sm font-bold`
- Body: `text-xs`, `text-sm font-light`
- Meta: `text-[9px] font-bold uppercase tracking-wider`

---

### Colour Anchor

**Primary hue:** Blue-600 (`#2563EB`) → Indigo-600 (`#4F46E5`) gradient

**Derived palette (from Tailwind classes in use):**

| Role | Light | Dark |
|------|-------|------|
| Surface page | `slate-50` / `white` | `slate-950` / `slate-900` |
| Surface card | `white` | `slate-900` |
| Surface navbar | `white/70` (glass) | `slate-900/70` (glass) |
| Primary text | `slate-900` | `white` |
| Secondary text | `slate-500`, `slate-400` | `slate-400` |
| Accent / CTA | `blue-600` → `blue-700` hover | `blue-400` |
| Accent gradient | `from-blue-600 to-indigo-600` | same |
| Success | `emerald-600` | `emerald-400` |
| Warning | `amber-500` | `amber-400` |
| Danger | `red-600` | `red-400` |
| Charts | `#3B82F6` (line), `#8B5CF6` (bar), varied pie | same |
| Borders | `slate-200`, `slate-100` | `slate-800` |
| Shadows | `shadow-slate-200/50`, `shadow-blue-500/10` | `shadow-none` or dark |

**Conflicting system:**
- PrimeVue preset primary is hard-coded to `#000000` — this creates a second colour system where PrimeVue components (DataTable, Dialog, FileUpload, ToggleButton, Divider) render in black instead of blue

**Gradient usage (areas of concern):**
- Hero backgrounds (multiple pages): `from-blue-50/50 via-white to-slate-50`
- Logo icon: `from-blue-600 to-indigo-600`
- Logo wordmark: `from-blue-600 to-indigo-600 bg-clip-text text-transparent`
- Headline: `from-blue-600 to-indigo-600 bg-clip-text text-transparent`
- Navbar CTA button: `from-blue-600 to-indigo-600`
- Admin KPI cards: emerald/blue/amber/violet gradients

---

### Anti-Patterns Identified (Do Not Carry Forward)

1. **Gradient headline + gradient logo + gradient hero** — three gradient fills on the same page is the #1 AI signature
2. **Fake Tailwind classes** — `slate-850`, `gray-105`, `blue-650` etc. will fail silently on any Tailwind install
3. **Glassmorphism on navbar** — decorative glass with no semantic depth
4. **Conflicting colour system** — PrimeVue black vs Tailwind blue/indigo
5. **Single-font system** — Figtree as both display and body; no pairing, no hierarchy
6. **Universal hover animations** — every card lifts, every button scales, every link underlines
7. **Invented colour tokens** — `text-slate-850` and friends will render as the fallback colour (likely black or inherit), invisible to the developer until checked
8. **Empty gradient background as visual filler** — hero gradient + blur orb has no semantic role

---

### Structural DNA Summary

```
Macrostructure: Hero-Led Portal (public) + Stat-Led Dashboard (admin)
Theme: Blue-gradient government (custom · kein blueprint)
Paper band: Light (>85%)
Accent hue: Cool (blue-600 → indigo-600)
Display style: Geometric-sans (Figtree — single face)
Nav archetype: N1b-variant (public) + N3 Side-rail (admin)
Footer archetype: Ft3-variant (public) + Ft4 Dense (admin)
Card radius: rounded-3xl (24px) — unusually large
Shadow weight: shadow-sm resting, coloured shadow-md on hover
Motion stance: motion-on (AOS, transition-colors duration-300, hover lifts)
```

---

### Verdict

This is a **functionally complete government portal** with a clear information architecture and solid Laravel backend. The design DNA is recognisable as "Indonesian government tech" — blue-dominant, formal, card-based, with heavy use of gradients and rounded corners.

The codebase needs **design system consolidation**:
1. Settle on one primary (blue-600, not black)
2. Purge all non-standard Tailwind classes
3. Choose a real type pairing (Outfit display + Figtree body, drop Inter)
4. Replace gradient fills with solid ink
5. Replace the nav/footer archetypes with genre-specific alternatives
6. Extract a `tokens.css` to prevent further palette drift

The structural bones (2/3+1/3 detail layout, filter+index listing, stat-led dashboard) are sound and should be preserved. The visual layer needs a disciplined re-skin, not a rebuild.
