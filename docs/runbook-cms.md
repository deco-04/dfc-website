# DFC Website CMS · publish flow

Sanity Studio lives at `/studio` on the deployed site. After launch, Liza
opens `https://denverflooringcollective.com/studio`, logs in with Google
SSO (Sanity handles auth), edits content, and clicks Publish.

For every publish to trigger an automatic redeploy on Cloudflare Pages,
do this one-time setup:

## 1. Create a deploy hook in Cloudflare Pages

1. Open https://dash.cloudflare.com
2. Workers & Pages → `dfc-website`
3. Settings → Builds & deployments → Deploy hooks
4. Add deploy hook
5. Name: `sanity-publish`
6. Branch: `main`
7. Save. Copy the resulting URL.

## 2. Set the Sanity env vars in Cloudflare

In Cloudflare Pages → `dfc-website` → Settings → Environment variables,
add to **Production** AND **Preview**:

| Name | Type | Value |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Plaintext | `k0jdv8n4` |
| `NEXT_PUBLIC_SANITY_DATASET` | Plaintext | `production` |
| `SANITY_API_READ_TOKEN` | **Secret** | (the read token from Sanity → API → Tokens) |

Trigger a redeploy after saving.

## 3. Configure the webhook in Sanity

1. Open https://www.sanity.io/manage
2. Pick the `dfc-website` project
3. API → Webhooks → Create webhook
4. URL: paste the Cloudflare deploy hook URL from step 1
5. Trigger on: Create + Update + Delete
6. Filter: `_type in ['homepage', 'serviceCategory', 'project', 'review', 'faqItem', 'serviceArea', 'siteSettings']`
7. Save

## 4. CORS origins

Verify all three are in Sanity → Project → API → CORS origins
(Andre completed this in setup phase B6):

- `http://localhost:3000`
- `https://dfc-website.deco-f30.workers.dev`
- `https://denverflooringcollective.com`

Each with "Allow credentials" = yes.

## Verifying the flow

1. Open `/studio` on production site
2. Create a new FAQ item document (question: "Test?", answer: "Yes.", displayOrder: 99)
3. Publish
4. Cloudflare Pages → Deployments tab should show a new build kicking off within seconds
5. ~2 minutes later, the new FAQ item appears at the bottom of the homepage FAQ
6. Delete the test FAQ item from Sanity to clean up

## Rollback

Each Cloudflare Pages deploy is preserved. To revert:
- Cloudflare Pages → Deployments → pick a prior good deploy → Rollback
- Or revert content in Sanity Studio (document history → restore)

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
"safeSanityFetch with fallback" pattern. Add wiring after Liza has
populated initial content in Studio.

## Initial content to seed

Once Studio is accessible, populate at minimum:

- 1 `siteSettings` document (phone, address, tagline, ratings)
- 1 `homepage` document (hero copy + manifesto + climate)
- 6 `serviceCategory` documents (hardwood, lvp, tile, etc)
- 8 `faqItem` documents (copy from `components/faq.data.ts`)
- 14 `serviceArea` documents (one per city)
- 1 `review` document (Kallianne Watson, featured = true)

After that, each new photo or project gets added as needed.
