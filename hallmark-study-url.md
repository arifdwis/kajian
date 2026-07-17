# Hallmark Study · SIKAJIAN — URL Mode

**Mode:** URL (https://kajian.test)
**Date:** 2026-07-17
**Source:** Live local instance (Inertia SPA — HTML shell only, Vue-rendered UI not captured)

---

## Caveat: SPA Shell

This is an Inertia.js SPA. WebFetch captures the server-rendered HTML shell and embedded JSON data, but **not** the client-rendered Vue UI (visual layout, colours, spacing, responsive behaviour). Rhythm assessment is unavailable in URL mode — see § Limits below.

---

## Extraction

### Remote Safety

`kajian.test` is a local development domain (Laravel Valet). Not a public template marketplace. No auth wall — the Inertia page data shows `"auth":{"user":null}` but the public home page loads without authentication.

### Observed HTML

**Page:** `Frontend/Portal/Home`
**Base domain:** `kajian.test` (localhost-resolved)
**Vite dev server:** `kajian.test:5173` (hot module replacement active)

### Fonts (exact, from `<link>` in `<head>`)

| Role | Face | Weights loaded | Source |
|------|------|---------------|--------|
| Display | **Outfit** | 400, 500, 600, 700, 800, 900 | Google Fonts |
| Body | **Figtree** | 300, 400, 500, 600 | Google Fonts |

Two-font pairing confirmed. Inter is absent — was dropped as designed.

### Body classes (from rendered HTML)

`font-sans antialiased bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark`

This confirms the Tailwind custom colours (`paper`, `ink`) from the redesign are active. The `font-sans` resolves to Figtree per `tailwind.config.js`.

### Inertia Page Data (extracted)

**Summary stats:**
- Total kajian: 0
- Published: 0
- Draft: 0
- Review: 0
- Archived: 0
- Views: 0
- Downloads: 0

**Bidangs (4):**
1. Bidang Pemerintahan dan Pembangunan Manusia
2. Bidang Penelitian dan Pengembangan
3. Bidang Perekonomian, SDA dan Infrastruktur
4. Bidang Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah

**Jenis Kajians (6):** Evaluasi Program, Kajian Kebijakan, Penelitian Ilmiah, Policy Brief, Riset Sosial, tes

**Tahuns:** 2020–2026

### Design System (inferred from codebase + URL confirmation)

| Token | Value | Status |
|-------|-------|--------|
| `--color-paper` | `#F9F8F6` | Confirmed (body class) |
| `--color-ink` | `#2C2A27` | Confirmed (body class) |
| `--color-accent` | `#C9B59C` | Inferred from tokens.css |
| `--font-display` | Outfit | Confirmed (font preload) |
| `--font-body` | Figtree | Confirmed (font preload + body class) |
| PrimeVue primary | `#C9B59C` | Inferred (datatable.js updated) |

### Routes (from Ziggy config — 72 routes)

Public portal:
- `GET /` → Home
- `GET /kajian` → KajianList
- `GET /kajian/search` → Search
- `GET /kajian/{slug}` → KajianDetail
- `POST /kajian/{slug}/download` → Download

Auth:
- `GET /login`, `GET /register`
- `GET /forgot-password`, `POST /forgot-password`, `POST /reset-password/{token}`

Admin:
- Dashboard, Profile, Notifications
- CRUD: Kajian (manage), Bidang, JenisKajian, Tahun, KataKunci
- Reports: Laporan, Statistik, CetakDetail, Export Excel
- Settings: Users, Roles, Permissions, Menu, LogActivity
- SSO: OAuth integration

---

## Diagnosis

### What's working (redesign confirmed live)

1. **Font pairing active** — Outfit (display) + Figtree (body), Inter removed
2. **Custom Tailwind palette active** — `bg-paper`, `text-ink` classes present in rendered HTML
3. **Body uses warm palette** — `#F9F8F6` paper, `#2C2A27` ink
4. **Vite + Inertia SSR pipeline functional** — hot module reloading on `:5173`

### What URL mode cannot assess (rhythm blind spot)

- **Visual hierarchy** — no rendered CSSOM to measure heading sizes, spacing rhythm, or section padding
- **Nav shape** — the Vue-rendered N6 Masthead is not in the HTML shell
- **Footer shape** — Ft5 Statement is client-rendered
- **Colours/shadow/glow** — no inline styles or rendered CSS custom properties captured
- **Responsive behaviour** — no media query triggering to evaluate
- **Animation/motion** — Vue transition classes not present in shell

### Architecture observations

- **Stack:** Laravel 13 + Inertia + Vue 3 + Vite 6 + Tailwind CSS 3.4 + PrimeVue 4
- **SSO ready:** OAuth routes for SSO login/callback/logout
- **Heavy route surface:** 72 named routes spanning public portal, CRUD masters, settings, laporan, and storage
- **Inertia page data is clean:** No flash messages, no auth required for home, no errors

---

## Limits (stated explicitly per protocol)

1. **Fonts:** URL mode names exact faces (Outfit, Figtree) and exact weights — confirmed
2. **Imagery:** Not assessed — no photographic content in HTML shell
3. **Rhythm:** **THE URL-MODE BLIND SPOT.** The rendered visual rhythm (generous vs templated spacing) cannot be determined from server HTML alone. A screenshot would close this gap
4. **Theme drift:** The design system (`design.md` + `tokens.css`) is locked. Subsequent pages should share the same theme — not drift

---

## Structural DNA (from codebase + URL confirmation)

```
Macrostructure: Hero-Led Portal (public) + Stat-Led Dashboard (admin)
Theme: Custom warm earth (paper #F9F8F6 · accent #C9B59C · ink #2C2A27)
Paper band: Light (97.5% OKLCH lightness)
Accent hue: Warm (60° — tan)
Display style: Geometric-sans (Outfit 700–900)
Body: Humanist-sans (Figtree 300–600)
Nav archetype: N6 Masthead (public) + N3 Side-rail (admin)
Footer archetype: Ft5 Statement (public) + Ft4 Dense (admin)
Motion stance: motion-cut (no AOS, silent toasts, minimal transitions)
```

---

## Verdict

The redesign is deployed and serving. Font pairing and colour tokens are confirmed live. The SPA nature means visual rhythm and rendered layout can't be assessed from URL alone — but the codebase audit and study already covered those in depth. The structural bones (2/3+1/3 detail, filter+index listing, stat-led dashboard) are preserved; the visual layer has been reskinned per `design.md`.
