# Hallmark Study · samarindakota.go.id

**Mode:** URL (https://samarindakota.go.id)
**Date:** 2026-07-17
**Remote safety:** Public government website — safe
**Stack:** Nuxt/Vue 3 + Tailwind CSS + Nuxt UI

---

## Diagnosis Report

Official portal of Pemerintah Kota Samarinda. A civic government website with search-first discovery, institutional authority, and a green/teal palette.

---

### Macrostructure

```
Fixed top nav (white, border-bottom)
  → Hero (full viewport, search + trending + KPI card)
  → Quick-access services (Akses Cepat Warga — 6 icon cards)
  → Info & Agenda (video, UMKM, news feed, agenda, gallery, dashboard links)
  → Footer (4 columns: brand + contact + app badges + links)
```

---

### Archetypes

| Archetype | Description |
|-----------|-------------|
| **Nav** | Institutional top-bar — white bg, slate-200 border-bottom, logo-left, horizontal mega-menu (Layanan, Informasi, Pemerintahan, Wilayah, PPID), search + dark-mode right. Active state: green bg pill. |
| **Hero** | **Full-viewport, split responsive.** Mobile: white bg, green/teal accent, search bar + trending chips + KPI card. Desktop: black bg, white text, yellow CTA, glassmorphism search, decorative pesut (river dolphin) illustration. |
| **Cards** | White surface, slate-200 border, `rounded-2xl`, icon in colored square (emerald/amber/violet/rose/blue), title, description, right-arrow. Hover: border shifts to primary green. |
| **CTA** | Primary: `bg-hijau-muda` (#99ad7a) white text, `rounded-xl`, bold. Secondary (on dark hero): `bg-kuning-medium` (#ffd066) slate-900 text. |
| **Footer** | 4-column: brand + tagline + social icons / contact + address / app badges (Google Play, App Store) / tautan links. Copyright bottom bar + language toggle. |

---

### Typography

| Role | Face | Weights |
|------|------|---------|
| Display | **Outfit** (Google Fonts) | 300–900 |
| Body | **Inter Variable** (self-hosted) | variable |
| UI | Inter / Outfit mix | — |

Outfit used for display/headings with `font-weight: 800`, `letter-spacing: -0.035em`. Dense type scale with heavy use of `text-[10px]`, `text-[11px]`, `text-xs` for labels.

---

### Colour Anchor

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary (hijau-tua)** | **#546b41** | Active nav, links, icons, headings — muted forest green |
| Primary soft | #15645b14 | Active nav background (8% opacity teal) |
| **Hijau-muda** | **#99ad7a** | Accent text, primary CTA — sage green |
| Biru-tua | #367585 | Hero body text, light-mode headings |
| Kuning-medium | #ffd066 | Secondary CTA on dark hero — warm yellow |
| Slate-50/100/200/500/900 | standard Tailwind | Cards, borders, muted text, headings |
| **Hero desktop** | black bg (#000) | Full dark hero with white/yellow text |

**Palette character:** Earthy green civic palette — muted forest greens, sage accents, teal undertones. Feels institutional but not cold. The green conveys trust, stability, and regional identity (Samarinda is a green river city).

---

### Key Design Decisions

1. **Search as primary interaction** — Hero dominated by a large search bar with trending topic chips. Government portals are findability-first.

2. **Dual responsive hero** — Mobile gets light (white bg + green text), desktop gets dark (black bg + white/yellow text). Distinct compositions for each context.

3. **Service taxonomy** — 6 quick-access cards (CCTV, SPMB, Bursa Kerja, Kependudukan, Perizinan, Kecamatan). Clear civic utility vocabulary.

4. **Regional identity** — Pesut (river dolphin) mascot illustration, "Maju Untuk Maju" tagline, city seal. The design roots itself in Samarinda specifically.

5. **App ecosystem** — Footer prominently features SamaGov mobile app (Google Play + App Store). Government-as-platform thinking.

6. **Dark mode toggle** — Surprising for a government site. Signals modernity.

---

### Anti-Patterns (Do Not Carry Forward)

1. **Two duplicate hero markups** — Light + dark versions live in the same section. Maintenance burden.
2. **Skeleton in nav** — Fixed nav shows placeholder bars instead of the real logo (client-rendered).
3. **Very small text** — `text-[9px]`, `text-[10px]` widespread. Accessibility concern.
4. **Decorative noise** — Multiple absolute-positioned divs, gradients, illustrations competing with content.
5. **Search-only trending links** — All trending chips route to `/cari?q=...` instead of dedicated pages.
6. **Hidden Google Translate** — Widget loaded but `display: none` in CSS.
7. **Nav skeleton** — Logo only renders after JS hydration.

---

### DNA Summary

```
Macrostructure: Government Portal (search-first hero + service cards + news feed + footer)
Theme: Custom civic (muted forest green #546b41 · sage accent #99ad7a)
Paper band: Light (white/gray) / Dark (black desktop hero)
Accent hue: Green (90–120° — muted)
Display style: Geometric-sans (Outfit 800)
Body style: Neutral-sans (Inter)
Nav archetype: Institutional top-bar with mega-menu
Footer archetype: 4-column government (brand + contact + app + links)
Signature move: Search-first hero + city mascot illustration + app badges in footer
```

---

### Verdict

Samarinda.go.id is a modern Indonesian government portal that balances institutional authority with civic approachability. The green palette (`#546b41` / `#99ad7a`) is distinctive and regionally grounded. The search-first hero and service-card taxonomy are strong patterns for any government information system.

The kajian project currently uses a blue-purple accent (`oklch(54% 0.220 268)`) which is technically modern but has no regional connection to Samarinda. If alignment with the city's official web presence is desired, shifting toward the green/teal civic palette would create visual kinship — but it would also change the modern-minimal SaaS feel toward a more institutional tone. Choose deliberately.
