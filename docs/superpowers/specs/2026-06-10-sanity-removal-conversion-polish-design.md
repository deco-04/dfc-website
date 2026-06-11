# DFC Website: Sanity Removal + Conversion Polish

**Date:** 2026-06-10
**Branch:** `feature/conversion-polish` (isolated from `main`; production unchanged until merge)
**Status:** Approved by Andre 2026-06-10

## Context

The v4 site is launch-ready on Cloudflare Workers (`dfc-website.deco-f30.workers.dev`), pending DNS swap which is blocked on client approval. A live UX review (desktop 1440px + mobile 375px) and a full platform audit informed this design.

Audit findings:

- Supabase is not connected to this project at all. No action needed.
- Sanity is connected but effectively unused: 7 Studio schemas exist, only `components/faq.tsx` queries Sanity, no content has been seeded, and `safeSanityFetch` silently falls back to hardcoded `faq.data.ts` on any error. Visitors today see only hardcoded content.
- Cloudflare, GHL, GTM/GA4, and GitHub Actions all earn their keep. No changes.

UX review findings:

1. Gallery tiles render as flat dark boxes until lazy-load fires. On slow connections the Projects section looks broken. No way to view photos larger.
2. No persistent mobile call/book action after the visitor scrolls past the nav.
3. The 5.0 rating proof lives only in the mid-page stats band, not at the point of decision (hero CTAs, /book page).
4. Motion is minimal and inconsistent; page navigation has no transition.

## Goals

- Remove the Sanity platform entirely with zero visitor-facing change.
- Lift mobile conversion with a sticky call/book bar.
- Make the project gallery feel instant (blur-up) and explorable (lightbox).
- Put the 5.0 Google rating next to the booking decision.
- Add motion polish without new dependencies or perf regression.

## Non-goals

- No copy changes. All Liza-locked copy (hero headline, manifesto, scope lists) stays byte-identical.
- No layout or palette redesign. The v4 design language is approved and stays.
- No DNS or production deployment changes. Everything ships to the branch; `main` and the live worker stay as-is until Andre merges.
- No new runtime dependencies.

## Part A: Sanity removal

Remove:

- Dependencies: `sanity`, `next-sanity`, `@sanity/client`, `@sanity/image-url`, `@sanity/vision`, `groq`, `styled-components`, `@portabletext/react`.
- Files: `sanity/` (schemas), `sanity.config.ts`, `sanity.cli.ts`, `lib/sanity-client.ts`, `lib/queries.ts`.
- `package.json` scripts: `studio:dev`, `studio:deploy`.
- `next.config.mjs` redirects for `/admin` and `/studio` (Studio will be unpublished).
- Sanity env vars from `.env.example`.

Change:

- `components/faq.tsx`: drop `safeSanityFetch`/`FAQ_QUERY`; import FAQ items directly from `components/faq.data.ts`. Rendered output identical.
- `docs/runbook-cms.md`: replace content with an archive note explaining content now lives in `components/*.data.ts` files and how to edit them.

Out of band (Andre, later): unpublish the hosted Studio at `denverflooringcollective.sanity.studio` and revoke the read token. Not blocking.

## Part B: Conversion polish

### SDR-1: Sticky mobile CTA bar

- New component `components/sticky-cta.tsx`, mounted in `app/layout.tsx`.
- Visible only under 768px, and only after the visitor scrolls past ~80% of the viewport height (IntersectionObserver on a hero sentinel; no scroll listeners).
- Two actions: "Call" (tel: link, fires the existing tracked-phone analytics event) and "Book estimate" (links `/book`).
- Fixed overlay animated with `transform` + `opacity` only; reserves no layout space, so CLS stays 0.
- Respects iOS safe-area insets (`env(safe-area-inset-bottom)` padding, the triple-defense pattern from the v4 build).
- Suppressed on `/book` and `/thanks` (redundant there). Suppression by pathname check.
- Sits below the GHL chat bubble z-index so chat stays reachable; chat bubble offset bumped up on mobile so they do not overlap.

### SDR-2: Gallery blur-up placeholders

- `scripts/build_photos.py` additionally emits a tiny (about 16px wide) base64 JPEG per gallery image into the existing photo manifest.
- Gallery tiles render the base64 blur as a background immediately; the full image fades in on load.
- No layout change; aspect ratios already fixed, CLS unaffected.

### SDR-3: Gallery lightbox

- New component `components/lightbox.tsx`, dependency-free, built on the native `<dialog>` element.
- Opens on gallery tile click/tap. Arrow keys and on-screen arrows navigate within the active category; swipe works via pointer events. Escape and backdrop click close. Focus is trapped while open and returned to the source tile on close.
- Shows the image plus its existing alt text as a caption.
- `aria-label`s on all controls; body scroll locked while open.

### SDR-4: Proof at the point of decision

- New small component `components/rating-chip.tsx`: "★ 5.0 on Google · 600+ floors installed", linking to the canonical reviews URL (`search.google.com/local/reviews?placeid=ChIJyfAeyyh9bIcROn-MDdfKru4`), opening in a new tab.
- Placed directly under the hero CTA pair on `/` and above the calendar embed on `/book`.
- Follows the standing copy rule: star icon next to the 5.0.

### SDR-5: Motion polish

- View Transitions API for cross-page navigation via the documented Next.js progressive-enhancement approach; browsers without support get current behavior. Zero new JS for unsupported browsers.
- Audit existing `motion-fade.tsx` usage and apply consistent reveal timing (same duration/easing/threshold) across home sections that currently animate inconsistently or not at all.
- All motion respects `prefers-reduced-motion`.

## User stories

1. As a homeowner on my phone, after reading about the process I can tap one persistent button to call or book without scrolling back up.
2. As a visitor on slow hotel Wi-Fi, the Projects section shows recognizable blurred photos immediately instead of dark empty boxes.
3. As a visitor evaluating craftsmanship, I can tap any project photo and flip through full-size photos of that category.
4. As a skeptical buyer about to book, I see the 5.0 Google rating right next to the booking button and can verify it on Google in one tap.
5. As Andre, I can revert everything by simply not merging the branch; production is untouched.

## Testing and guardrails

- Vitest unit tests for `sticky-cta` (visibility logic, pathname suppression), `lightbox` (open/close/navigation/focus return), `rating-chip` (link + copy).
- Playwright e2e: sticky bar appears after scroll on mobile viewport; lightbox opens and closes; gallery renders placeholders.
- Existing CI gates must stay green: typecheck, lint, vitest, build. Lighthouse: Perf >= 90, CLS 0, SEO 100 (verified via the CI Lighthouse step on the branch build and locally before PR).
- Copy rules enforced: "Denver Metro", star icon with 5.0, installer voice, no em dashes in any copy.
- Branch-only workflow: PRs into `feature/conversion-polish` or direct commits to it; nothing merges to `main` without Andre's explicit go.

## Rollback

`main` is never touched. To abandon: delete the branch. To partially adopt: cherry-pick the Sanity-removal commit or individual SDR commits, which are kept separate for exactly this reason.
