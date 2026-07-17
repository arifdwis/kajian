# Design — SIKAJIAN (BAPPERIDA Samarinda)

A locked design system for this app. Every page redesign reads this file before emitting code.

## Genre

modern-minimal (civic)

Cool, engineered, regional. A government research portal aligned with Samarinda's official visual identity — muted forest green accent, Outfit display, search-first discovery.

## Macrostructure family

- Public portal pages: **Government Portal** — search-first hero + service cards + content index
- Admin app pages: **Workbench** — functional, tool-like, dense
- Content/detail pages: **Long Document** — 2/3 + 1/3 with sidebar

## Theme — Samarinda civic (custom)

Muted forest green anchor, sage green light accent, cool white paper. Rooted in Samarinda's regional identity.

| Token | Light | Dark |
|-------|-------|-------|
| `--color-paper` | oklch(99% 0 0) | oklch(14% 0.008 130) |
| `--color-accent` | oklch(44% 0.055 135) | oklch(55% 0.06 135) |
| `--color-accent-light` | oklch(68% 0.07 125) | oklch(70% 0.06 125) |
| `--color-ink` | oklch(20% 0.02 130) | oklch(92% 0.005 130) |

## Typography

- Display: **Outfit**, weight 600/700/800. Tight tracking (-0.02em to -0.035em).
- Body: **Inter**, weight 300/400/500/600. Clean, highly readable.
- Mono: **Geist Mono**, weight 400/500/600. Code, meta labels, small UPPERCASE.
- All headings roman. No italic headers.

## Nav — N5 Floating pill

Content-sized, detached from edges, blur backdrop, soft shadow. Same as Tally DNA — the civic feel comes from color, not nav shape.

## Footer — government 4-column

Statement tagline + link columns (Akses Cepat · Layanan · Kontak) + legal row.

## What pages MUST share

- The Outfit + Inter + Geist Mono font stack.
- The forest green accent `var(--color-accent)` at ≤5% per viewport.
- White paper (#FCFCFD).
- Hairline `1px solid var(--color-rule)` separators.

## What pages MAY differ on

- Macrostructure within page-type family.
- Hero archetype (search-first for portal, stats-led for admin).
