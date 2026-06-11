# DFC Website

Denver Flooring Collective marketing site. Built with Next.js 15 App Router,
deployed to Cloudflare Workers via OpenNext.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

All site content lives in version-controlled data files. Edit, commit, and CI
deploys. No CMS login required.

| Content | File |
|---|---|
| FAQ items | `components/faq.data.ts` |
| Floor/material pages | `components/floors.data.ts` |
| Services grid | `components/services.data.ts` |
| Cities served | `components/cities.data.ts` |
| Project gallery | `public/photos/manifest.json` (regenerate via `pnpm photos`) |

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Next.js production build |
| `pnpm build:cf` | OpenNext Cloudflare worker build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check (no emit) |
| `pnpm test` | Vitest unit tests |
| `pnpm e2e` | Playwright end-to-end tests |
| `pnpm photos` | Regenerate `public/photos/manifest.json` from `public/photos/` |
| `pnpm og` | Regenerate OG images |
| `pnpm deploy` | Build + deploy to Cloudflare Workers |

## Deploy

Every push to `main` triggers the GitHub Actions workflow at
`.github/workflows/deploy.yml`, which runs type check, lint, unit tests, builds
the OpenNext worker on Ubuntu, deploys via Wrangler, then smoke-tests every
public route.

Required GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

See `docs/runbook-cms.md` for content editing and `SECURITY.md` for the security
baseline.
