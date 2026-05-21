# DFC Website CMS · publish flow

Sanity Studio is hosted by Sanity at:

**https://denverflooringcollective.sanity.studio**

This is the canonical URL for editing content. Bookmark it.

The Studio is intentionally NOT served from the Next.js worker on Cloudflare,
because Sanity Studio's bundle (~15 MB) exceeds Cloudflare Workers' size limits
(3 MB free / 10 MB paid). Hosting on Sanity is free, has no size limit, and
has built-in auth and document history.

## Editing flow

1. Open https://denverflooringcollective.sanity.studio
2. Log in (Google / GitHub / email — first time only, then session persists)
3. Edit content, click Publish
4. Public site updates within ~60 seconds on the next read (Sanity CDN cache)

No redeploy required. The Next.js site reads from Sanity at request time using
`safeSanityFetch` with a hardcoded fallback per component, so if Sanity is
down the site degrades gracefully to the baked-in content.

## CORS origins

Verify all three are in Sanity → Project → API → CORS origins:

- `http://localhost:3000`
- `https://dfc-website.deco-f30.workers.dev`
- `https://denverflooringcollective.com`

Each with "Allow credentials" = yes.

## Local development

To edit content offline or test schema changes locally:

```bash
pnpm exec sanity dev
```

Studio runs on http://localhost:3333. Changes here write to the same
`production` dataset on Sanity, so be careful — there is no separate dev
dataset configured.

## Deploying schema changes

When you change anything in `sanity/schemas/`, re-deploy the hosted Studio:

```bash
pnpm exec sanity deploy
```

The hostname is pinned to `denverflooringcollective` in `sanity.cli.ts`, so
this no longer prompts. Output:
`Success! Studio deployed to https://denverflooringcollective.sanity.studio`

## What is currently wired to Sanity

| Component | Status | Fallback |
|---|---|---|
| FAQ | wired | `components/faq.data.ts` |
| Homepage hero | not yet | hardcoded in `components/hero.tsx` |
| Services | not yet | `components/services.data.ts` |
| Reviews (Kallianne featured) | not yet | hardcoded in `components/testimonial.tsx` |
| Service areas | not yet | hardcoded in `components/service-area.tsx` |
| Photos | not yet | `public/photos/manifest.json` |

Future wiring is incremental. Each component gets the same
`safeSanityFetch` with fallback pattern. Add wiring after Liza has
populated initial content in Studio.

## Initial content to seed

Once you start using Studio, populate at minimum:

- 1 `siteSettings` document (phone, tagline, ratings)
- 1 `homepage` document (hero copy + manifesto + climate)
- 6 `serviceCategory` documents (hardwood, engineered, LVP, laminate, tile, refinishing)
- 8-12 `faqItem` documents (overrides the hardcoded set in `faq.data.ts`)
- A handful of `review` documents (matches the Kallianne pattern in `testimonial.tsx`)

## Rollback

Sanity Studio retains document history. To revert content:

1. Open the document in Studio
2. Three-dot menu → History
3. Pick a prior version → Restore

For code rollbacks (Next.js site):

```bash
cd C:\Users\andre\Code\dfc-website
git revert <bad-commit>
pnpm run deploy
```
