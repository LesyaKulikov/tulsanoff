# Fully responsive layout

Status: closed (2026-10-22)
Type: task
Blocked by:

The homepage is currently built desktop-first from the fixed 1440px artboard (`src/index.css` sets a 1128px container with 156px gutters, and sections use fixed heights). The `raw/home.svg` is a single fixed-width export.

## Scope

Make the page fully responsive across mobile, tablet, and desktop. Sections to adapt:

- Header / top bar (logo, pill, CTA) — collapse or reflow below ~1024px
- Hero — text block + CTA currently fixed at 713px height and absolute-positioned
- Services, Stats, BigCards, Gallery — fixed multi-column grids collapse to fewer columns
- Testimonials — horizontal scroll row should become a stacked/grid layout
- FaqList, CtaBand, Footer columns — stack on small screens

## Notes

- Decided to ship desktop-first; responsive is intentionally out of scope for the first build (ADR-0001/i18n build).
- Large hero/gallery JPEGs (several MB each) are unoptimized raw exports; revisit sizing/compression alongside responsive work.

## Resolution (2026-10-22)

Closed during the i18n/hebrew feature — see `.scratch/i18n-hebrew-and-fixes/plan.md`
phases 2 and 6, which replaced the fixed-artboard layout with fluid gutters
(`--gutter: clamp(20px, 10.83vw, 156px)`), flexible section heights and
responsive media queries in the rebuilt components.

- **Verified**: overflow sweeps across **49 viewport × locale × page combos** —
  RU + HE × {390, 768, 1024, 2560} × 7 routes (incl. 404 and a service detail)
  = **0 horizontal-overflow failures**; mobile and tablet screenshots confirm
  stacked grids, wrapped tab pills and correct RTL mirroring.
- **Scope list is stale**: Stats / BigCards / Gallery / Testimonials components
  no longer exist (removed during the feature); every surviving section
  reflows as designed.
- **Image-optimization note resolved** (was bundled above): assets are now
  compressed webp/jpeg — largest image 804 KB, `public/` totals 11 MB
  including both hero videos.
