# Hallmark Study · Tally

**Mode:** URL (https://www.usehallmark.com/examples/tally/)
**Date:** 2026-07-17
**Remote safety:** Hallmark's own example page — safe, not a template marketplace
**Rhythm:** Assessed (full HTML captured — static example, no auth wall)

---

## Diagnosis Report

Tally is a usage-based billing SaaS landing page. It reads as modern-minimal with a technical/dev-tool register — cool confidence, live data as the hero, instrument-panel vocabulary.

---

### Macrostructure: `SaaS/API Product (Marquee Hero variant)`

```
Hero (live counter + invoice card + marquee strip)
  → Logos bar
  → Workbench console preview
  → Stats triplet (3 columns)
  → Feature cards (3 columns, tilted)
  → Pricing (3 tiers, toggle monthly/annual)
  → Testimonial (single quote)
  → CTA panel
  → Footer (statement + 4 link columns)
```

---

### Archetypes

| Archetype | Pick | Notes |
|-----------|------|-------|
| **Nav** | N5 Floating pill | Detached from edges, blur backdrop, soft shadow. Wordmark + 4 links + Sign in + Start free CTA. Vercel/Linear vocabulary. |
| **Hero** | Marquee Hero | Left-biased: title + subtitle + CTAs + fineprint left, live invoice card (Tier-A CSS art) right. Below: scrolling marquee strip (METER·EVERY·CALL). |
| **Logos** | Inline text row | 6 client names (Bramble, orbit/labs, FORGE, etc.) in varied weights + spacing. No logos, just typographic. |
| **Workbench** | Console preview | App UI mockup as a dark graphite card with sidebar nav + stat row + inline SVG chart. The "instrument panel" moment. |
| **Stats** | 3-card triplet | Number + label + note. 42B+, 9.2×, $0.00. Real-feeling numbers. |
| **Features** | 3-card tilt grid | Each card has a CSS art area + title + description + link. `data-tilt` attribute for micro-interaction. |
| **Pricing** | 3-tier toggle | Starter ($0) / Scale ($249 — featured) / Enterprise (Custom). Monthly/Annual toggle with "save 20%". |
| **Testimonial** | Single quote | One bold line + byline with name + company + stat. |
| **CTA** | Panel with gradient bg | Blue-purple gradient panel wrapping headline + CTAs. The only gradient on the page. |
| **Footer** | Ft5 Statement + Ft3 Columns | Statement tagline at top, then 4 link columns (Product/Developers/Company/Resources), then legal row. |

---

### Typography

| Role | Face | Weights | Tracking |
|------|------|---------|----------|
| Display | **Geist** | 600/700 | -0.02em to -0.035em |
| Body | **Geist** | 400/500 | normal |
| Serif accent | **Instrument Serif** | Italic | normal (micro-accent on single words) |
| Mono/UPPERCASE | **Geist Mono** | 500/600 | 0.06em to 0.08em |

Single-family discipline (Geist for everything) with one serif italic micro-accent. The Instrument Serif italic is used sparingly — the word "actually" in the hero headline, the word "don't" in section heads — never for full phrases.

**Type scale (inferred):**
- Display: clamp(~2.5rem, ~5vw, ~4rem) — hero h1
- Section title: ~1.5rem
- Body: 0.875rem – 1rem
- Meta/mono: 0.625rem – 0.75rem

---

### Colour Anchor

| Token | Value | Role |
|-------|-------|------|
| Paper | Cool white (inferred ~oklch(99% 0 0)) | Page background |
| Ink | Near-black (inferred ~oklch(20% 0.02 260)) | Body text |
| Ink-2 | Mid-grey (inferred ~oklch(45% 0.01 260)) | Secondary text |
| **Accent** | **oklch(54% 0.220 268)** | Electric blue-purple — buttons, links, chart area fill, focus |
| Accent ink | White | Text on accent bg |
| Rule | ~oklch(90% 0 0) | Hairline borders |
| Graphite | ~oklch(22% 0.016 260) | Workbench console bg |
| Success | Green (inferred) | Volume discount, positive numbers |

The accent is high-chroma (0.22) at hue 268 — a blue-purple leaning slightly purple, distinct from Cobalt's pure blue (256). It's electric but not cold.

---

### Key Design Decisions

1. **Live data as theatre** — The hero's `12,847 events/sec` counter and the invoice card with live-updating totals are the page's signature move. The marquee strip below reinforces the "real-time" claim.

2. **No box shadows** — Surface separation comes from hairlines (`1px solid var(--color-rule)`) and one barely-there lift on the invoice card. Depth is drawn, not floated.

3. **Single dark beat** — The workbench console section is a dark graphite card (`oklch(22% 0.016 260)`). Three light sections → one dark → back to light. The page's one dark moment.

4. **Tilt on feature cards** — `data-tilt` attribute on the three feature cards. Subtle perspective shift on hover. The one microinteraction that's not a standard hover.

5. **Mono for meta** — All eyebrows, status chips, fineprint labels, and small UPPERCASE labels use Geist Mono with `0.06em–0.08em` letter-spacing. The machine-readout voice.

6. **Gradient only on CTA** — The only gradient on the page is the CTA panel background (blue-purple). A deliberate release after 5 sections of zero-chroma restraint.

7. **Instrument Serif italic as micro-accent** — One italic word per section headline. Never a full heading in italic. The single AI-tell to watch for (italic emphasis in headers) is used deliberately — one word only, in an otherwise-upright heading.

---

### Anti-Patterns Identified (Do Not Carry Forward)

1. **Data-tilt** — `data-tilt` on feature cards is a trendy microinteraction that reads as "added for effect." The page earns it through restraint elsewhere, but it's a risk.
2. **Cobalt accent** — `oklch(54% 0.220 268)` is beautiful but specific. If your brand leans pure blue rather than blue-purple, adjust the hue (not the chroma).
3. **Instrument Serif italic** — The single-italic-word pattern works once. A second italic word on the same page starts to look like the AI italic-header tell.
4. **Footer is hybrid** — Ft5 Statement at top + Ft3 4-link columns below. Having both reads as indecision between two archetypes. Pick one.

---

### DNA Summary

```
Macrostructure: SaaS/API Product (Marquee Hero)
Theme: Custom (cool white + electric blue-purple oklch(54% 0.220 268))
Paper band: Light (~99%)
Accent hue: Blue-purple (268° — high chroma 0.22)
Display style: Grotesk-sans (Geist — single family)
Serif accent: Instrument Serif italic (micro-use only, ≤1 word per heading)
Nav: N5 Floating pill
Footer: Ft5 Statement + Ft3 Columns (hybrid)
Radii: ~8px (cards), ~6px (buttons) — tight, technical
Motion: Live counters, tilt on features, section fade-in
```

---

### Verdict

Tally is a reference-quality modern-minimal SaaS page. Its signature moves — live data as hero, single dark console beat, mono-UPPERCASE meta voice, electric blue-purple accent, and one italic word per heading — are all transportable to the kajian project.

The accent (`oklch(54% 0.220 268)`, approx #4066FF) is close to Cobalt's (`oklch(58% 0.20 256)`, approx #3366FF) but slightly more purple. Tally's accent has higher chroma (0.22 vs 0.20) and a warmer hue (268° vs 256°). Pick one and stay consistent — the kajian project already uses Cobalt's pure blue.
