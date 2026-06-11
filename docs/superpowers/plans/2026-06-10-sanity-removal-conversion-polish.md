# Sanity Removal + Conversion Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the unused Sanity CMS platform and ship four conversion-polish features (gallery blur-up, gallery lightbox, proof links, sticky mobile CTA, scroll-reveal motion) with zero visitor-facing regressions and CI perf gates intact.

**Architecture:** All work on branch `feature/conversion-polish`; `main` and production stay untouched. Sanity removal is pure deletion plus one component simplification (FAQ already renders hardcoded data). New UI is dependency-free: native `<dialog>` lightbox, IntersectionObserver-free sticky bar (passive scroll check), `next/image` built-in blur placeholders fed by a generated `lqip.json`, and CSS-only scroll reveals.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind, Vitest + Testing Library (jsdom), Playwright, Python/PIL for the LQIP generator, pnpm 9.

**Working directory:** repo root (`dfc-website`). All commands run there. Repo currently lives at `C:\Users\andre\Documents\Deco - Smart Business Operations\Claude Projects\dfc-website`.

**Conventions that bind every task:**
- Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- No em dashes in any copy or comment text.
- Icons are inline SVG (lucide-react is broken under SSR in this repo, see `components/hero.tsx` header comment).
- Copy rules: "Denver Metro", star icon beside "5.0", installer voice.

---

### Task 1: Remove Sanity entirely

Sanity is consumed by exactly one component (`components/faq.tsx`) which already falls back to `components/faq.data.ts`. Everything else is dead weight.

**Files:**
- Modify: `components/faq.tsx`
- Delete: `lib/sanity-client.ts`, `lib/queries.ts`, `sanity/` (whole dir), `sanity.config.ts`, `sanity.cli.ts`
- Modify: `package.json`, `next.config.mjs`, `.env.example`, `public/_headers`, `docs/runbook-cms.md`

- [ ] **Step 1: Simplify faq.tsx to use hardcoded data only**

Replace the entire contents of `components/faq.tsx` lines 1-14 (imports through `getFaqs`/`Faq` opening) so the file reads:

```tsx
import { FAQS } from './faq.data';

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = FAQS.map((f) => ({ question: f.q, answer: f.a }));

export function Faq() {
  const items = ITEMS;
```

Keep the JSX body (the `<section id="faq">` block) exactly as-is. Note `Faq` is no longer `async` and `getFaqs` is gone.

- [ ] **Step 2: Delete Sanity files**

```powershell
Remove-Item -Recurse -Force sanity, sanity.config.ts, sanity.cli.ts, lib\sanity-client.ts, lib\queries.ts
```

- [ ] **Step 3: Remove Sanity deps and scripts from package.json**

In `package.json` remove from `dependencies`: `@portabletext/react`, `@sanity/client`, `@sanity/image-url`, `@sanity/vision`, `groq`, `next-sanity`, `sanity`, `styled-components`. Remove from `scripts`: `studio:dev`, `studio:deploy`. Then:

```powershell
pnpm install
```

Expected: lockfile shrinks substantially; install succeeds.

- [ ] **Step 4: Remove /admin and /studio redirects from next.config.mjs**

Delete the two redirect objects for `/admin` and `/studio` (next.config.mjs lines 35-40, the block below the `// Internal convenience` comment). Keep the two 308 redirects above them.

- [ ] **Step 5: Clean .env.example and CSP**

In `.env.example` delete the `# Sanity` block (lines 1-4: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`).

In `public/_headers`: remove ` https://*.sanity.io` from the `connect-src` list in the CSP line, and delete the comment line `# - Sanity CDN (image-source paths if/when we wire images through Sanity)`.

- [ ] **Step 6: Archive the CMS runbook**

Replace the entire contents of `docs/runbook-cms.md` with:

```markdown
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
```

- [ ] **Step 7: Verify nothing references Sanity**

```powershell
Get-ChildItem -Recurse -File -Exclude pnpm-lock.yaml | Where-Object { $_.FullName -notmatch 'node_modules|\.git\\|\.next|\.open-next|docs\\superpowers' } | Select-String -Pattern 'sanity' -SimpleMatch -List
```

Expected: only hits in `docs/runbook-cms.md` (the archive note), `README.md` (fix any setup instructions mentioning Studio while here), and old lighthouse-reports (ignore). Fix any other hit.

- [ ] **Step 8: Full local gate**

```powershell
pnpm typecheck; if ($?) { pnpm lint }; if ($?) { pnpm test }
```

Expected: all pass. The 3 existing vitest files do not touch Sanity.

- [ ] **Step 9: Build**

```powershell
pnpm build
```

Expected: compiles clean, all 17+ routes generated.

- [ ] **Step 10: Commit**

```powershell
git add -A
git commit -m "refactor: remove unused Sanity CMS, content stays in data files"
```

---

### Task 2: LQIP generator script

Generates a tiny base64 blur per gallery image from the already-processed `public/photos/*.jpg`, so it works without the gitignored source photos.

**Files:**
- Create: `scripts/build_lqip.py`
- Create (generated): `public/photos/lqip.json`
- Modify: `package.json` (script entry)

- [ ] **Step 1: Write scripts/build_lqip.py**

```python
"""Generate LQIP (low-quality image placeholder) data URIs for gallery photos.

Reads every *--landscape_4x3.jpg in public/photos (the gallery tile crop),
shrinks it to 16px wide, and writes public/photos/lqip.json mapping the
public src path ("/photos/<name>--landscape_4x3.jpg") to a base64 JPEG data
URI. next/image consumes these as blurDataURL.

Idempotent. Run after build_photos.py whenever photos change:
    pnpm run lqip
"""

import base64
import io
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public" / "photos"
OUT = PHOTOS / "lqip.json"

lqip: dict[str, str] = {}
for path in sorted(PHOTOS.glob("*--landscape_4x3.jpg")):
    img = Image.open(path).convert("RGB")
    w, h = img.size
    tiny = img.resize((16, max(1, round(16 * h / w))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "JPEG", quality=40)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    lqip[f"/photos/{path.name}"] = f"data:image/jpeg;base64,{b64}"
    print(f"  {path.name}  ->  {len(b64)} chars")

OUT.write_text(json.dumps(lqip, indent=0, sort_keys=True))
print(f"\nWrote {OUT} with {len(lqip)} entries.")
```

- [ ] **Step 2: Add the pnpm script**

In `package.json` scripts, after `"og": "python scripts/build_og.py",` add:

```json
"lqip": "python scripts/build_lqip.py",
```

- [ ] **Step 3: Run it**

```powershell
pnpm run lqip
```

Expected: one line per photo, final line `Wrote ... lqip.json with N entries` where N is 30+. File size roughly 20-40 KB total.

- [ ] **Step 4: Commit**

```powershell
git add scripts/build_lqip.py public/photos/lqip.json package.json
git commit -m "feat: add LQIP generator for gallery blur-up placeholders"
```

---

### Task 3: Gallery blur-up placeholders

**Files:**
- Test: `tests/lqip.test.ts`
- Modify: `components/gallery.tsx`

- [ ] **Step 1: Write the failing data-integrity test**

Create `tests/lqip.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import manifest from '../public/photos/manifest.json';
import lqip from '../public/photos/lqip.json';

type Item = { slug: string; src_4x3: string };
type Category = { label: string; items: Item[] };

describe('lqip.json', () => {
  const categories = manifest as Record<string, Category>;
  const placeholders = lqip as Record<string, string>;

  it('has a data-URI placeholder for every gallery tile in the manifest', () => {
    const missing: string[] = [];
    for (const cat of Object.values(categories)) {
      for (const item of cat.items) {
        if (!placeholders[item.src_4x3]) missing.push(item.src_4x3);
      }
    }
    expect(missing).toEqual([]);
  });

  it('placeholders are small base64 jpeg data URIs', () => {
    for (const value of Object.values(placeholders)) {
      expect(value.startsWith('data:image/jpeg;base64,')).toBe(true);
      expect(value.length).toBeLessThan(2500);
    }
  });
});
```

- [ ] **Step 2: Run it**

```powershell
pnpm test -- tests/lqip.test.ts
```

Expected: PASS if every manifest entry got an LQIP in Task 2. If any are missing (manifest references a photo with no processed jpg), the first test FAILS listing them; fix by either running `pnpm run lqip` again or correcting the manifest path, then re-run to PASS. Either way this test now guards the contract.

- [ ] **Step 3: Wire blurDataURL into the gallery**

In `components/gallery.tsx`, add after the manifest import (line 2):

```tsx
import lqip from '../public/photos/lqip.json';

const LQIP = lqip as Record<string, string>;
```

Then extend the `<Image>` inside the tile map (currently lines 38-45) with placeholder props:

```tsx
<Image
  src={it.src_4x3}
  alt={it.alt}
  width={1200}
  height={900}
  placeholder={LQIP[it.src_4x3] ? 'blur' : 'empty'}
  blurDataURL={LQIP[it.src_4x3]}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

- [ ] **Step 4: Verify**

```powershell
pnpm typecheck; if ($?) { pnpm test }
```

Expected: PASS. (`resolveJsonModule` is already on; manifest.json is imported the same way today.)

- [ ] **Step 5: Commit**

```powershell
git add tests/lqip.test.ts components/gallery.tsx
git commit -m "feat: blur-up placeholders on gallery tiles"
```

---

### Task 4: Gallery lightbox

Native `<dialog>`, no dependencies. The gallery section stays a server component; each category grid becomes a small client component that owns the lightbox state.

**Files:**
- Create: `components/gallery-grid.tsx`
- Test: `tests/gallery-grid.test.tsx`
- Modify: `components/gallery.tsx`

- [ ] **Step 1: Write the failing component test**

Create `tests/gallery-grid.test.tsx`:

```tsx
import { describe, expect, it, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from '@/components/gallery-grid';

const ITEMS = [
  { slug: 'a', src_4x3: '/photos/a--landscape_4x3.jpg', alt: 'Photo A' },
  { slug: 'b', src_4x3: '/photos/b--landscape_4x3.jpg', alt: 'Photo B' },
];

beforeAll(() => {
  // jsdom does not implement <dialog> methods
  HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
});

describe('GalleryGrid', () => {
  it('renders one button per item', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('opens the lightbox on tile click showing that photo', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo b/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('img')?.alt).toBe('Photo B');
  });

  it('arrow keys navigate between photos', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo a/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog.querySelector('img')?.alt).toBe('Photo B');
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(dialog.querySelector('img')?.alt).toBe('Photo A');
  });

  it('close button closes the dialog', () => {
    render(<GalleryGrid label="Hardwood" items={ITEMS} lqip={{}} />);
    fireEvent.click(screen.getByRole('button', { name: /photo a/i }));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog.open).toBe(false);
  });
});
```

- [ ] **Step 2: Run it, expect failure**

```powershell
pnpm test -- tests/gallery-grid.test.tsx
```

Expected: FAIL, cannot resolve `@/components/gallery-grid`.

- [ ] **Step 3: Implement components/gallery-grid.tsx**

```tsx
'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Item = { slug: string; src_4x3: string; alt: string };

// Client-side category grid with a native <dialog> lightbox. No deps:
// <dialog> gives us Escape-to-close, ::backdrop, focus containment, and
// top-layer rendering for free. Arrow keys + on-screen arrows navigate
// within the category; backdrop click closes.
export function GalleryGrid({
  label,
  items,
  lqip,
}: {
  label: string;
  items: Item[];
  lqip: Record<string, string>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  };
  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);
  const step = useCallback(
    (delta: number) => {
      setIndex((cur) => (cur === null ? cur : (cur + delta + items.length) % items.length));
    },
    [items.length]
  );

  // Restore scroll + clear index on every close path (Esc, backdrop, button).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = '';
      setIndex(null);
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  // Pointer swipe (mobile): track horizontal travel, threshold 48px.
  const touchX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => { touchX.current = e.clientX; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (touchX.current === null) return;
    const dx = e.clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  const active = index === null ? null : items[index];

  return (
    <div className="mb-16 last:mb-0">
      <h3 className="font-display italic text-2xl text-walnut-deep mb-4">{label}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => open(i)}
            aria-label={`View larger: ${it.alt}`}
            className="relative aspect-[4/3] overflow-hidden bg-espresso group cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage"
          >
            <Image
              src={it.src_4x3}
              alt={it.alt}
              width={1200}
              height={900}
              placeholder={lqip[it.src_4x3] ? 'blur' : 'empty'}
              blurDataURL={lqip[it.src_4x3]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={onKeyDown}
        onClick={onBackdropClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        aria-label={`${label} project photos`}
        className="backdrop:bg-onyx/90 bg-transparent p-0 max-w-[min(96vw,1080px)] w-full open:flex flex-col items-center"
      >
        {active && (
          <figure className="m-0 w-full">
            <Image
              src={active.src_4x3}
              alt={active.alt}
              width={1080}
              height={810}
              className="w-full h-auto"
              sizes="96vw"
            />
            <figcaption className="font-body text-linen/90 text-sm mt-3 px-1 flex items-center gap-4">
              <span className="flex-1">{active.alt}</span>
              {index !== null && (
                <span className="text-linen/60 tabular-nums">{index + 1} / {items.length}</span>
              )}
            </figcaption>
          </figure>
        )}
        <div className="flex gap-3 mt-4 mb-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            &rarr;
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-linen border border-linen/40 px-4 py-2 hover:bg-linen/10"
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
```

- [ ] **Step 4: Run the test, expect pass**

```powershell
pnpm test -- tests/gallery-grid.test.tsx
```

Expected: 4 tests PASS.

- [ ] **Step 5: Use GalleryGrid in gallery.tsx**

In `components/gallery.tsx`, replace the category map block (the whole `{Object.entries(CATEGORIES).map(...)}` expression) with:

```tsx
{Object.entries(CATEGORIES).map(([slug, cat]) =>
  cat.items.length === 0 ? null : (
    <GalleryGrid key={slug} label={cat.label} items={cat.items} lqip={LQIP} />
  )
)}
```

Update imports: remove `import Image from 'next/image';` (no longer used in this file) and add `import { GalleryGrid } from './gallery-grid';`. The `LQIP` import from Task 3 stays and is passed down; the inline `<figure>`/`<Image>` markup moved into GalleryGrid.

- [ ] **Step 6: Full check + visual sanity**

```powershell
pnpm typecheck; if ($?) { pnpm test }; if ($?) { pnpm build }
```

Expected: all green. Then `pnpm dev`, open http://localhost:3000, scroll to Projects, click a tile: lightbox opens, arrows and Escape work, scroll is locked while open.

- [ ] **Step 7: Commit**

```powershell
git add components/gallery.tsx components/gallery-grid.tsx tests/gallery-grid.test.tsx
git commit -m "feat: native dialog lightbox for project gallery"
```

---

### Task 5: Proof links (rating chip on /book, linked stat on home)

**Files:**
- Create: `components/rating-chip.tsx`
- Test: `tests/rating-chip.test.tsx`
- Modify: `app/book/page.tsx`, `components/hero.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/rating-chip.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RatingChip, GOOGLE_REVIEWS_URL } from '@/components/rating-chip';

describe('RatingChip', () => {
  it('links to the canonical Google reviews URL in a new tab', () => {
    render(<RatingChip />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', GOOGLE_REVIEWS_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('shows the 5.0 rating and install count', () => {
    render(<RatingChip />);
    expect(screen.getByText(/5\.0 on Google/i)).toBeInTheDocument();
    expect(screen.getByText(/600\+ floors installed/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect failure**

```powershell
pnpm test -- tests/rating-chip.test.tsx
```

Expected: FAIL, cannot resolve `@/components/rating-chip`.

- [ ] **Step 3: Implement components/rating-chip.tsx**

```tsx
export const GOOGLE_REVIEWS_URL =
  'https://search.google.com/local/reviews?placeid=ChIJyfAeyyh9bIcROn-MDdfKru4';

function StarIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Small proof line for decision points (booking page). Links out to the
// real Google reviews so the claim is verifiable in one tap.
export function RatingChip({ className = '' }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-caps text-onyx/80 hover:text-sage-deep transition-colors ${className}`}
    >
      <StarIcon className="w-4 h-4 text-flatiron shrink-0" />
      <span>5.0 on Google</span>
      <span aria-hidden className="text-onyx/40">&middot;</span>
      <span>600+ floors installed</span>
    </a>
  );
}
```

- [ ] **Step 4: Run it, expect pass**

```powershell
pnpm test -- tests/rating-chip.test.tsx
```

Expected: 2 tests PASS.

- [ ] **Step 5: Place the chip on /book**

In `app/book/page.tsx`, inside the `<header>` after the closing `</p>` of the intro paragraph, add:

```tsx
<RatingChip className="mt-5 justify-center" />
```

And add the import at the top: `import { RatingChip } from '@/components/rating-chip';`

- [ ] **Step 6: Link the hero 5.0 stat to Google reviews**

In `components/hero.tsx`, the stats `<ul>` maps over four items. Change the `5.0` entry in the array to carry the link, by replacing the whole stats block (the `<ul>...</ul>`) with:

```tsx
<ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-walnut-deep/20">
  {[
    { big: '600+', label: 'Projects' },
    { big: '14',   label: 'Front Range cities' },
    { big: '1 yr', label: 'Warranty' },
    { big: '5.0',  label: 'stars · Google', star: true, href: 'https://search.google.com/local/reviews?placeid=ChIJyfAeyyh9bIcROn-MDdfKru4' },
  ].map((t) => {
    const stat = (
      <>
        <strong className="display text-sage text-2xl leading-none flex items-center gap-1.5">
          {t.big}
          {t.star && (
            <svg className="w-5 h-5 text-flatiron shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          )}
        </strong>
        <span className="font-body text-[10px] uppercase tracking-caps text-onyx/70 mt-1">{t.label}</span>
      </>
    );
    return (
      <li key={t.label} className="flex flex-col">
        {t.href ? (
          <a href={t.href} target="_blank" rel="noopener noreferrer" className="flex flex-col hover:opacity-80 transition-opacity" aria-label="Read our 5.0-star Google reviews">
            {stat}
          </a>
        ) : (
          stat
        )}
      </li>
    );
  })}
</ul>
```

Note: TypeScript infers `href`/`star` as optional only if at least one element has them; since the array is inline-literal, annotate if needed: `[...] as { big: string; label: string; star?: boolean; href?: string }[]`.

- [ ] **Step 7: Verify**

```powershell
pnpm typecheck; if ($?) { pnpm test }; if ($?) { pnpm build }
```

Expected: green.

- [ ] **Step 8: Commit**

```powershell
git add components/rating-chip.tsx tests/rating-chip.test.tsx app/book/page.tsx components/hero.tsx
git commit -m "feat: verifiable Google-reviews proof at booking decision points"
```

---

### Task 6: Sticky mobile CTA bar

**Files:**
- Create: `components/sticky-cta.tsx`
- Test: `tests/sticky-cta.test.tsx`
- Modify: `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Write the failing test**

Create `tests/sticky-cta.test.tsx`:

```tsx
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

const usePathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({ usePathname: () => usePathnameMock() }));

import { StickyCta } from '@/components/sticky-cta';

function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  act(() => { window.dispatchEvent(new Event('scroll')); });
}

describe('StickyCta', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/');
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('is hidden before the visitor scrolls past the hero', () => {
    render(<StickyCta />);
    expect(screen.getByTestId('sticky-cta')).toHaveAttribute('data-visible', 'false');
  });

  it('appears after scrolling past 80% of viewport height', () => {
    render(<StickyCta />);
    scrollTo(700);
    expect(screen.getByTestId('sticky-cta')).toHaveAttribute('data-visible', 'true');
  });

  it('renders nothing on /book', () => {
    usePathnameMock.mockReturnValue('/book');
    render(<StickyCta />);
    expect(screen.queryByTestId('sticky-cta')).toBeNull();
  });

  it('renders nothing on /thanks', () => {
    usePathnameMock.mockReturnValue('/thanks');
    render(<StickyCta />);
    expect(screen.queryByTestId('sticky-cta')).toBeNull();
  });

  it('has call and book actions', () => {
    render(<StickyCta />);
    expect(screen.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:7205991664');
    expect(screen.getByRole('link', { name: /book/i })).toHaveAttribute('href', '/book');
  });
});
```

- [ ] **Step 2: Run it, expect failure**

```powershell
pnpm test -- tests/sticky-cta.test.tsx
```

Expected: FAIL, cannot resolve `@/components/sticky-cta`.

- [ ] **Step 3: Implement components/sticky-cta.tsx**

```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackPhoneClick } from '@/lib/analytics';

// Mobile-only persistent call/book bar. Appears once the visitor scrolls
// past ~80% of the first viewport (past the hero CTAs), so it never
// competes with the hero on first paint. Fixed overlay animated with
// transform only: zero layout shift. Hidden on routes where it would be
// redundant noise.
const SUPPRESSED = ['/book', '/thanks'];

export function StickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (SUPPRESSED.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      data-testid="sticky-cta"
      data-visible={visible}
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div
        className="grid grid-cols-2 gap-px bg-walnut-deep/20 border-t border-walnut-deep/20"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a
          href="tel:7205991664"
          onClick={trackPhoneClick}
          className="flex items-center justify-center gap-2 bg-linen text-sage-deep font-body text-[13px] font-semibold tracking-caps uppercase py-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-sage text-linen font-body text-[13px] font-semibold tracking-caps uppercase py-4"
        >
          Book estimate
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run it, expect pass**

```powershell
pnpm test -- tests/sticky-cta.test.tsx
```

Expected: 5 tests PASS.

- [ ] **Step 5: Mount in layout and keep the chat bubble clear of the bar**

In `app/layout.tsx`: add `import { StickyCta } from '@/components/sticky-cta';` and render `<StickyCta />` directly after `{children}` (before `<DeferredAnalytics />`).

In `app/globals.css`, append at the end:

```css
/* Keep the GHL chat bubble above the sticky mobile CTA bar. The widget
   mounts a top-level <chat-widget> custom element; on phones we lift it
   by the bar height (56px) plus its default 20px offset. Desktop is
   untouched (the bar is md:hidden). */
@media (max-width: 767px) {
  chat-widget {
    --chat--widget-bottom: 76px;
    bottom: 76px !important;
  }
}
```

- [ ] **Step 6: Verify in browser**

```powershell
pnpm dev
```

In a 375px-wide viewport: bar absent at top, slides up after one viewport of scroll, Call/Book both tappable, chat bubble (appears after interaction) sits above the bar, no overlap. On `/book` and `/thanks?source=default`: no bar. Desktop 1440px: no bar at any scroll depth.

- [ ] **Step 7: Full gate + commit**

```powershell
pnpm typecheck; if ($?) { pnpm test }; if ($?) { pnpm build }
git add components/sticky-cta.tsx tests/sticky-cta.test.tsx app/layout.tsx app/globals.css
git commit -m "feat: sticky mobile call/book bar"
```

---

### Task 7: Scroll-reveal motion polish (CSS only)

**Files:**
- Modify: `app/globals.css`
- Modify: `components/gallery.tsx`, `components/faq.tsx`, `components/services.tsx`, `components/process.tsx`, `components/climate.tsx`, `components/testimonial.tsx` (add a class to each section header)

- [ ] **Step 1: Add the reveal utility to globals.css**

Append to `app/globals.css` (after the sticky-CTA rule from Task 6):

```css
/* Scroll-driven section reveals. Pure CSS: animation-timeline: view()
   plays the same dfc-fade-in used above the fold as each section header
   scrolls into view. @supports-gated so Safari/Firefox without
   scroll-timelines render sections normally (no hidden content, no JS
   fallback needed). Reduced-motion users get no animation at all. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation-name: dfc-fade-in;
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
      animation-fill-mode: both;
      animation-timeline: view();
      animation-range: entry 0% entry 60%;
    }
  }
}
```

- [ ] **Step 2: Apply .reveal to section headers**

Add `reveal` to the existing `className` of the `<header>` element in each of these home sections (one-word class addition per file, no other changes):

- `components/gallery.tsx`: `<header className="max-w-prose mb-12 reveal">`
- `components/faq.tsx`: `<header className="mb-12 reveal">`
- `components/services.tsx`: the section's `<header>` element
- `components/process.tsx`: the section's `<header>` element
- `components/climate.tsx`: the section's `<header>` element
- `components/testimonial.tsx`: the section's wrapping `<figure>` or `<header>` element

If a listed component has no `<header>` element, apply the class to its top heading wrapper instead. Do not apply `reveal` to `hero.tsx` or anything above the fold (those already use `.fade-in`, and a view() timeline on above-fold content can replay awkwardly).

- [ ] **Step 3: Verify**

```powershell
pnpm typecheck; if ($?) { pnpm build }
```

Then in Chrome (supports view()): scroll the home page, headers fade-slide in as they enter, no jank, gallery images unaffected. In the dev tools rendering panel, enable "Emulate prefers-reduced-motion" and confirm reveals are instant. Firefox: sections render statically (no hidden content).

- [ ] **Step 4: Commit**

```powershell
git add app/globals.css components/gallery.tsx components/faq.tsx components/services.tsx components/process.tsx components/climate.tsx components/testimonial.tsx
git commit -m "feat: css scroll-driven section reveals"
```

---

### Task 8: E2E coverage + final verification + push

**Files:**
- Create: `e2e/conversion-polish.spec.ts`

- [ ] **Step 1: Write the e2e spec**

Create `e2e/conversion-polish.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('sticky mobile CTA', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 1440) > 767, 'mobile only');

  test('appears after scrolling past the hero and links work', async ({ page }) => {
    await page.goto('/');
    const bar = page.getByTestId('sticky-cta');
    await expect(bar).toHaveAttribute('data-visible', 'false');
    await page.mouse.wheel(0, 1200);
    await expect(bar).toHaveAttribute('data-visible', 'true');
    await expect(bar.getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:7205991664');
    await expect(bar.getByRole('link', { name: /book/i })).toHaveAttribute('href', '/book');
  });

  test('absent on /book', async ({ page }) => {
    await page.goto('/book');
    await page.mouse.wheel(0, 1200);
    await expect(page.getByTestId('sticky-cta')).toHaveCount(0);
  });
});

test.describe('gallery lightbox', () => {
  test('opens, navigates, and closes', async ({ page }) => {
    await page.goto('/');
    const firstTile = page.locator('#projects button[aria-label^="View larger"]').first();
    await firstTile.scrollIntoViewIfNeeded();
    await firstTile.click();
    const dialog = page.locator('#projects dialog[open]').first();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('#projects dialog[open]')).toHaveCount(0);
  });
});

test.describe('proof links', () => {
  test('book page shows the rating chip linking to Google reviews', async ({ page }) => {
    await page.goto('/book');
    const chip = page.getByRole('link', { name: /5\.0 on Google/i });
    await expect(chip).toHaveAttribute('href', /search\.google\.com\/local\/reviews/);
  });
});
```

- [ ] **Step 2: Run the full e2e suite**

```powershell
pnpm e2e
```

Expected: new spec passes on both projects (desktop-chrome skips the sticky tests by design); all pre-existing specs still green.

- [ ] **Step 3: Full local gate, one last time**

```powershell
pnpm typecheck; if ($?) { pnpm lint }; if ($?) { pnpm test }; if ($?) { pnpm build }
```

Expected: everything green.

- [ ] **Step 4: Commit and push the branch**

```powershell
git add e2e/conversion-polish.spec.ts
git commit -m "test: e2e coverage for sticky cta, lightbox, proof links"
git push -u origin feature/conversion-polish
```

Note: pushing the branch does NOT deploy. CI deploy runs only on `main`. Verify on GitHub that the branch CI (typecheck/lint/test/build steps) is green if the workflow runs on branches; if it only runs on main, the local gate above is the gate.

- [ ] **Step 5: Report**

Summarize for Andre: branch pushed, all gates green, what changed, and that merge to `main` (which auto-deploys) stays his call. Optionally open a draft PR for review convenience; do not merge.

---

## Self-review notes

- Spec coverage: Part A = Task 1. SDR-2 = Tasks 2-3. SDR-3 = Task 4. SDR-4 = Task 5. SDR-1 = Task 6. SDR-5 = Task 7. Testing/guardrails = every task's gate steps + Task 8.
- Out-of-band items (unpublish hosted Studio, revoke Sanity token) are Andre-side and listed in the spec, not tasked here.
- Lighthouse: the CI Lighthouse step runs post-deploy on main; since we never merge, run a local check if desired via `pnpm preview` + PSI on the preview URL, but the design avoids LCP/TBT/CLS risk by construction (no new render-blocking work, fixed overlays, CSS-only motion).
