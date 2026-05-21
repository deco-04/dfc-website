# DFC Website v4 Launch Checklist

Status: pre-launch. Site lives at `https://dfc-website.deco-f30.workers.dev` until DNS cutover.

## Lighthouse staging audit

Run date: 2026-05-20

| URL | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | 51 | 95 | 77 | 100 |
| `/lp/meta` | 49 | 96 | 77 | 69 |

Reports: see `lighthouse-reports/home.report.html` and `lighthouse-reports/lp-meta.report.html`.

Lighthouse spec targets: Performance >=90, A11y >=95, BP >=95, SEO 100.

Gaps vs target (to triage before final cutover):
- Performance below target on both URLs. Likely culprits: GTM + GA4 third-party JS, large hero image not served as AVIF/WebP at optimal sizes, render-blocking fonts. Investigate in Task 40 or post-launch.
- Best Practices below target on both URLs. Likely third-party cookie warnings from GTM/GA4. Verify in the HTML reports.
- SEO 69 on `/lp/meta` is below the homepage 100. Likely missing canonical or robots directive specific to landing pages; verify in the report.
- Accessibility within tolerance (95/96).

## Functional checks (pre-launch)

- [ ] All 9 routes return 200
- [ ] `/sitemap.xml` lists 5 URLs
- [ ] `/robots.txt` includes AI-bot allowlist
- [ ] `/llms.txt` serves
- [ ] OG share image renders on Facebook debugger
- [ ] OG share image renders on LinkedIn Post Inspector
- [ ] iMessage / Slack / WhatsApp paste preview shows the staircase image
- [ ] Phone CTA dials 720-599-1664 from a mobile device
- [ ] Calendar widget loads (`/book`)
- [ ] Remote estimate form loads (`/remote-estimate`)
- [ ] Contact form loads (`/contact`)
- [ ] Review widget loads with at least 3 reviews showing (`/reviews`)
- [ ] `/thanks` renders with correct copy for each `?source=` variant: default, calendar, remote-estimate, meta, google
- [ ] 301 redirect: `/calendar-website-onsite-free-estimate?utm_source=test` -> `/book?utm_source=test`
- [ ] 301 redirect: `/remote-estimate-form?utm_source=test` -> `/remote-estimate?utm_source=test`
- [ ] GTM container fires `page_view` on every route
- [ ] GA4 receives custom events: `lead_submit`, `calendar_book`, `phone_click`, `landing_page_view`
- [ ] No console errors on any route

## DNS / production cutover steps (Task 40, Andre executes)

1. Lower DNS TTL on `denverflooringcollective.com` apex + `www` to 5 minutes (48 hours before cutover).
2. In Cloudflare Pages -> `dfc-website` -> Custom domains: add `denverflooringcollective.com` and `www.denverflooringcollective.com`.
3. At the domain registrar, update nameservers to Cloudflare&rsquo;s (or add CNAME / A records Cloudflare provides).
4. Verify TLS cert provisions for both hosts.
5. In Cloudflare Pages -> Settings -> Environment variables, set:
   - `NEXT_PUBLIC_SITE_URL` = `https://denverflooringcollective.com` (Production AND Preview)
6. Trigger a fresh deploy so OG / canonical URLs pick up the new SITE_URL.
7. Update each GHL form&rsquo;s "Redirect after submit" URL to `https://denverflooringcollective.com/thanks?source=<formname>`:
   - Contact form `pN1j2f72dFaRTfGfVWSe`
   - Remote estimate `THPaKoZtHXFieIRS9zE2`
   - Book calendar `aEgakNOq8nqb7Iz4ag0z`
8. Archive (do not delete) the old GHL Sites pages. Rename to `Archived - 2026-MM-DD - pre-Next.js`.
9. After cutover, smoke test the 301 redirects on the production domain:
   - `curl -I https://denverflooringcollective.com/calendar-website-onsite-free-estimate` -> expect 301 to `/book`
   - `curl -I https://denverflooringcollective.com/remote-estimate-form` -> expect 301 to `/remote-estimate`
10. Submit `https://denverflooringcollective.com/sitemap.xml` to Search Console.
11. Verify Google Business Profile listing still resolves to the correct site.
12. Raise DNS TTL back to default (1 hour or auto).

## Rollback procedure

If anything breaks badly after cutover:

1. In Cloudflare Pages -> Deployments, find the prior successful deploy, click "Rollback".
2. If the issue is DNS-level, point nameservers back to the previous registrar config (this is why we lowered TTL to 5 min).
3. Re-enable the archived GHL Sites pages if needed.

DNS reverts in <10 min with TTL=5min. The old GHL Sites is paused but not deleted, so it can be re-published in <1 min.

## Post-launch verification (Task 41)

- [ ] Day 1: GA4 real-time shows page_views from production domain
- [ ] Day 1: First lead through `/book` arrives in GHL with UTM data
- [ ] Day 3: Cloudflare Pages analytics shows traffic split between old-URL 301s and new-URL direct
- [ ] Day 7: Re-run Lighthouse against production domain, expect parity with staging
- [ ] Day 7: Search Console shows new URLs being indexed
- [ ] Week 2: Otto weekly report includes Meta vs Google attribution split correctly
