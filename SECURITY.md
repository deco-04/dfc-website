# Security policy

## Reporting a vulnerability

Email **deco@scalewithgos.com**. Please do not open a public GitHub issue
for security reports.

We aim to acknowledge within 48 hours and ship a fix within 7 days for
anything that materially impacts site visitors.

## What this site stores

- **Nothing user-supplied is stored by the Next.js worker itself.** All
  forms are GoHighLevel iframe embeds and submit directly to GHL.
- **GHL** is the lead store: CRM contact records, calendar appointments,
  estimate request payloads.
- **Cloudflare Workers** hosts the static + server-rendered site, no
  persistent storage attached.

## Threat model

- **Lead leakage**: lead data lives in GHL; protect with GHL login
  hygiene and principle of least privilege on any added team members.
- **Site defacement / spoofing**: protected by Cloudflare ACL and CSP
  (see `public/_headers`).
- **Phishing emails using the dfc brand**: outside the scope of this
  site; report inbound suspicious mail to Andrew at the listed phone.

## Standing controls

- **HTTPS everywhere** with HSTS preload (`Strict-Transport-Security`
  in `public/_headers`).
- **Content Security Policy** allowlist for the only third parties we
  embed: GHL widgets (`api.leadconnectorhq.com`, `link.msgsndr.com`,
  `reputationhub.site`), Google Tag Manager, GA4. Inline script/style
  permitted (Next.js + GTM both inject inline). `object-src 'none'`,
  `frame-ancestors 'self'`.
- **Referrer-Policy**: `strict-origin-when-cross-origin` so outbound
  clicks do not leak the originating path.
- **Permissions-Policy** denies camera, microphone, geolocation,
  interest-cohort (FLoC).
- **X-Frame-Options**: `SAMEORIGIN` so the site cannot be iframed
  off-domain.
- **X-Content-Type-Options**: `nosniff`.
- **Noindex headers** on `/thanks`, `/lp/*` so post-conversion routes
  and paid landing pages do not compete with the home page in search.
- **Cloudflare WAF** (managed rules) sits in front of the worker.
- **Wrangler API token** lives only in GitHub Actions repo secrets.
  Token has `Edit Cloudflare Workers` scope (no DNS, no Pages, no R2).

## Deploy chain integrity

Every push to `main` builds + deploys via GitHub Actions on
`ubuntu-latest`. The workflow at `.github/workflows/deploy.yml`:

1. Runs `tsc --noEmit` (type check).
2. Runs `next lint`.
3. Runs `vitest run` (unit tests).
4. Builds the OpenNext worker.
5. Deploys via `opennextjs-cloudflare deploy`.
6. Hits every public route with curl, fails the job on any non-200.

If any step fails the deploy is held; production keeps serving the
last green build.

## Dependencies

- Renovate or Dependabot are NOT currently configured. Run `pnpm
  outdated` quarterly and review major bumps. Patch+minor bumps from
  trusted publishers (`@opennextjs/cloudflare`, `next`, `react`) are
  safe to apply in bulk.
- `lucide-react` is intentionally NOT a dependency (v1 has an SSR
  hydration bug). Do not re-introduce it. Use inline SVGs.

## Audit log

| Date | Reviewer | Notes |
|---|---|---|
| 2026-05-21 | DECO | Baseline shipped (CSP, HSTS, headers, SECURITY.md, deploy gate). |
