# Plan: Re-apply i18n / Hebrew / fixes incrementally

## Why this exists

The first pass applied ~74 file changes in one shot and broke most of the
layout. We could not tell which change caused it. This plan re-applies the
same work **one verified step at a time** so that when (if) the layout breaks,
we know exactly which step broke it.

## Branches

| Branch | State |
| --- | --- |
| `main` | **Baseline.** Clean at `3a31ad5`. This is the "known good" site. |
| `feature/i18n-hebrew-and-fixes` | **Reference.** One snapshot commit `b61ef6d` with ALL the work. Source of truth we pull files *from*. Do not edit this branch. |
| `feature/i18n-hebrew-iterative` | **Work branch.** We are here. Each phase below pulls files from the reference branch, verifies, and commits. |

## How to apply a step

Every step is applied by checking out only that step's paths from the
reference snapshot, then verifying, then committing:

```bash
git checkout feature/i18n-hebrew-and-fixes -- <paths for this step>
npx tsc -b          # must be clean
npx vite build      # must succeed
# ...visual check in browser (npm run dev)...
git commit -m "<step message>"
```

Then tick the checkbox. If the layout breaks after a step, that step is the
culprit — `git reset --hard HEAD~1` to undo it, and we debug that one step
in isolation.

## Verify-everything checklist (run after EVERY step)

- [ ] `npx tsc -b` clean
- [ ] `npx vite build` succeeds
- [ ] Header renders, nav + burger work, no overlap
- [ ] Home: Hero / Promise / Approach / Services / Masters / FAQ / CtaBand / Footer
- [ ] Services page: grid + masonry + subscription + loyalty + FAQ
- [ ] Service detail page renders
- [ ] Certificates page
- [ ] About page
- [ ] Contacts page
- [ ] No horizontal scroll, no clipped text, no overlapping elements
- [ ] Mobile width (~375px) and desktop width (~1280px) both OK

---

## Phase 1 — i18n infrastructure (no visual change)

Logic only. Should not alter layout at all. Prerequisite for locale work.

- [ ] **1.1 Core i18n modules.** Pull `src/i18n/messages.ts`,
      `src/i18n/Message.tsx`. Commit. Verify no visual change.

## Phase 2 — Design tokens (HIGH layout risk — isolate this)

This rewrote `src/index.css` (token values, `--gutter`, `--header-h`,
`--page-top`, `--app-max`, radius/motion) and made `src/glass.css`
token-driven. **This is the prime suspect** because it is global. Apply it
ALONE so a break here is unambiguous.

- [ ] **2.1 Tokens + glass.** Pull `src/index.css`, `src/glass.css`. Verify
      EVERY page and BOTH widths carefully. If layout breaks, it is here.

## Phase 3 — Routing & app shell

Structural. `Layout.tsx` wraps every page, so a break here shows up
everywhere.

- [ ] **3.1 Routes + 404 page.** Pull `src/routes.ts`, `src/pages/NotFoundPage.tsx`,
      `src/pages/Page.module.css`. Add the catch-all route to `src/App.tsx`
      (edit by hand — App.tsx also has other changes, so only take the route
      additions). Verify: a bogus URL shows the 404 page.
- [ ] **3.2 Layout shell.** Pull `src/Layout.tsx`, `src/App.tsx` fully. Verify
      route transitions, scroll-to-top, skip link, header/footer on every page.

## Phase 4 — Hebrew locale + language switcher + RTL

Medium risk. RTL flips layout but only when Hebrew is selected; the logical-
properties conversion could affect Russian if done wrong. Verify in BOTH
languages.

- [ ] **4.1 Locale registry + provider.** Pull `src/i18n/LocaleProvider.tsx`,
      `src/i18n/localeContext.ts`, `src/main.tsx`. Verify RU renders as before.
- [ ] **4.2 Hebrew + en locale files.** Pull `src/i18n/he-IL.json`,
      `src/i18n/ru-RU.json`, `src/i18n/en-US.json`, `index.html`. Verify RU
      copy unchanged.
- [ ] **4.3 Header switcher + RTL.** Pull `src/components/Header/Header.tsx`,
      `src/components/Header/Header.module.css`. Verify RU↔HE switch, that
      Hebrew shows RTL and does not break the header, and localStorage
      persistence.

## Phase 5 — Contacts rebuild

Localized to the Contacts page + Footer.

- [ ] **5.1 Shared contact data.** Pull `src/contacts.ts`,
      `src/components/SocialLinks/`. (SocialLinks not rendered yet — no visual
      change expected.)
- [ ] **5.2 Contacts page.** Pull `src/pages/ContactsPage.tsx`,
      `src/pages/ContactsPage.module.css`. Verify map, branches, phones/email
      tappable.
- [ ] **5.3 Footer contact links.** Pull `src/components/Footer/Footer.tsx`,
      `src/components/Footer/Footer.module.css`. Verify `tel:`/`mailto:` links.

## Phase 6 — Component fixes (one component at a time)

The biggest bucket. **Pull one component per step** so any layout break is
isolated to a single component. After each, re-run the verify checklist and
pay special attention to that component.

- [ ] **6.1 Hero** — `src/components/Hero/*` (DOM order, video reduced-motion)
- [ ] **6.2 Approach** — `src/components/Approach/*` (heading)
- [ ] **6.3 Services** — `src/components/Services/*` (ARIA tabs)
- [ ] **6.4 ServicesGrid** — `src/components/ServicesGrid/*` (ARIA tabs)
- [ ] **6.5 ServiceCard** — `src/components/ServiceCard/*` (alt/aria)
- [ ] **6.6 ServicesMasonry** — `src/components/ServicesMasonry/*` (dedupe)
- [ ] **6.7 FaqList** — `src/components/FaqList/*` (real button)
- [ ] **6.8 LoyaltyCard** — `src/components/LoyaltyCard/*` (glow math + CLS)
- [ ] **6.9 Masters** — `src/components/Masters/*` (hover-reachable CTA)
- [ ] **6.10 SubscriptionBand** — `src/components/SubscriptionBand/*`
- [ ] **6.11 Promise** — `src/components/Promise/*`
- [ ] **6.12 AboutHero** — `src/components/AboutHero/*`
- [ ] **6.13 AboutDescription** — `src/components/AboutDescription/*`
- [ ] **6.14 AboutMasters** — `src/components/AboutMasters/*` (ARIA tabs,
      querySelector crash fix)
- [ ] **6.15 CertificateHero** — `src/components/CertificateHero/*`
- [ ] **6.16 CtaBand + CtaButton** — `src/components/CtaBand/*`,
      `src/components/CtaButton/*`
- [ ] **6.17 Button** — `src/components/Button/*` (discriminated union)
- [ ] **6.18 Arrow** — `src/components/Arrow/Arrow.tsx`
- [ ] **6.19 BlinkText** — `src/components/BlinkText/*`

## Phase 7 — Page-level wiring

- [ ] **7.1 ServicesPage** — `src/pages/ServicesPage.tsx`
- [ ] **7.2 CertificatesPage** — `src/pages/CertificatesPage.tsx`
- [ ] **7.3 AboutPage** — `src/pages/AboutPage.tsx`
- [ ] **7.4 MassageDetailPage** — `src/pages/MassageDetailPage.tsx`,
      `src/pages/MassageDetailPage.module.css`

## Phase 8 — Deletions (low risk)

Removing components that are no longer mounted. Verify nothing references them
(build must stay clean).

- [ ] **8.1 Delete orphans.** Remove `src/components/Testimonials/*`,
      `src/components/MassagesSection/*`, `src/components/StudioCard/*`,
      `src/components/Chevron/Chevron.tsx`. Verify build clean and no page
      tries to import them.

## Phase 9 — Docs (zero layout risk)

- [ ] **9.1 Docs + ADR.** Pull `CONTEXT.md`, `README.md`,
      `docs/adr/0001-i18n-message-id-fallback.md`.

---

## Final

- [ ] Full verify checklist passes at desktop AND mobile, in RU AND HE.
- [ ] `glubokotkanniy` (deep tissue) copy removal reviewed — confirm it is
      really dead, or restore it.
- [ ] `certificates.hero.cta` copy/target mismatch ("LEARN MORE" → `/contacts`)
      decided.
- [ ] Merge `feature/i18n-hebrew-iterative` → `main`.
- [ ] Delete the `feature/i18n-hebrew-and-fixes` snapshot branch (or keep for
      reference).

## Notes

- `.scratch/homepage/issues/01-responsive-layout.md` is still open; structural
  causes were fixed but visual confirmation is pending — close it during the
  relevant phase (2 and 6).
- Keep CSS on logical properties (`padding-inline`, `inset-inline-start`) so
  Hebrew RTL keeps working.
