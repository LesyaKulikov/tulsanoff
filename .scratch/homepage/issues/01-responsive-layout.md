# Fully responsive layout

Status: open
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
