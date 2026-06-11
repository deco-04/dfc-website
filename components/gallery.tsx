import Image from 'next/image';
import manifest from '../public/photos/manifest.json';
import lqip from '../public/photos/lqip.json';

type Item = { slug: string; src_3x4: string; src_4x3: string; src_16x9: string; alt: string };
type Category = { label: string; items: Item[] };

const CATEGORIES = manifest as Record<string, Category>;
const LQIP = lqip as Record<string, string>;

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

        {Object.entries(CATEGORIES).map(([slug, cat]) => (
          cat.items.length === 0 ? null : (
            <div key={slug} className="mb-16 last:mb-0">
              <h3 className="font-display italic text-2xl text-walnut-deep mb-4">{cat.label}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.items.map((it) => (
                  <figure key={it.slug} className="relative aspect-[4/3] overflow-hidden bg-espresso group">
                    <Image
                      src={it.src_4x3}
                      alt={it.alt}
                      width={1200}
                      height={900}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder={LQIP[it.src_4x3] ? 'blur' : 'empty'}
                      blurDataURL={LQIP[it.src_4x3]}
                    />
                  </figure>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
