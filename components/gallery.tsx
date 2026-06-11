import manifest from '../public/photos/manifest.json';
import lqip from '../public/photos/lqip.json';
import { GalleryGrid } from './gallery-grid';

type Item = { slug: string; src_3x4: string; src_4x3: string; src_16x9: string; alt: string };
type Category = { label: string; items: Item[] };

const CATEGORIES = manifest as Record<string, Category>;
const LQIP = lqip as Record<string, string>;

function lqipFor(items: { src_4x3: string }[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const it of items) {
    const v = LQIP[it.src_4x3];
    if (v) out[it.src_4x3] = v;
  }
  return out;
}

export function Gallery() {
  return (
    <section id="projects" className="bg-linen-warm py-24 lg:py-36">
      <div className="max-w-site mx-auto px-6 lg:px-12">
        <header className="max-w-prose mb-12">
          <div className="eyebrow mb-4">Recently installed</div>
          {/* Headline + copy refreshed 2026-05-23 per Liza's brief. */}
          <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
            Flooring is the <span className="italic">foundation</span>...
            <br />
            so details matter.
          </h2>
          <p className="font-body text-onyx/85 mt-4">
            Explore Denver Flooring Collective projects: installation, refinishing, repairs, baseboards,
            staircases, painting, and more.
          </p>
          <p className="font-body text-onyx/85 mt-2">
            More projects on our Instagram{' '}
            <a href="https://instagram.com/denver_flooring" target="_blank" rel="noopener" className="text-sage-deep border-b border-sage-deep">@denver_flooring</a>.
          </p>
        </header>

        {Object.entries(CATEGORIES).map(([slug, cat]) =>
          cat.items.length === 0 ? null : (
            <GalleryGrid key={slug} label={cat.label} items={cat.items} lqip={lqipFor(cat.items)} />
          )
        )}
      </div>
    </section>
  );
}
