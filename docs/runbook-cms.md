# Content runbook

> 2026-06-10: Sanity CMS was removed (it was never seeded; the site always
> rendered its hardcoded fallbacks). Content now lives in version-controlled
> data files. Edit, commit, and CI deploys.

| Content | File |
|---|---|
| FAQ items | `components/faq.data.ts` |
| Floor/material pages | `components/floors.data.ts` |
| Services grid | `components/services.data.ts` |
| Cities served | `components/cities.data.ts` |
| Project gallery | `public/photos/manifest.json` (hand-curated; see `scripts/build_photos.py`) |
