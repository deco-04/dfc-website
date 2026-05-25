type Stat = { big: string; label: string; star?: boolean };

const STATS: Stat[] = [
  { big: '14',    label: 'Front Range cities served' },
  { big: '600+',  label: 'Floors installed to date' },
  { big: '1 yr',  label: 'Workmanship warranty' },
  { big: '5.0',   label: 'stars · Google', star: true },
];

// Front Range climate-specific install considerations. Bullets per Liza's
// 2026-05-24 brief. Phrasing is condition-first: each item names the
// real-world stressor and what we do about it on install.
const CLIMATE_BULLETS = [
  'Dry climate.',
  'Strong UV.',
  'Snowmelt at the entry.',
  'Temperature swings between basement and main floor.',
];

// Stylized layered mountain silhouette. Pure SVG so it ships zero KB of
// raster image weight, scales cleanly, and stays brand-correct in the
// forest/camel palette. Decorative — aria-hidden.
function MountainBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 w-full h-[55%] pointer-events-none opacity-50"
    >
      <defs>
        <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#274034" stopOpacity="0" />
          <stop offset="100%" stopColor="#274034" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="500" fill="url(#sky-fade)" />
      {/* Back range — pale ridge */}
      <path
        d="M0,360 L80,310 L160,330 L240,260 L320,290 L420,220 L520,260 L620,200 L740,240 L840,180 L960,220 L1060,200 L1200,260 L1200,500 L0,500 Z"
        fill="#3F5547"
        opacity="0.55"
      />
      {/* Mid range — sage */}
      <path
        d="M0,420 L100,360 L180,380 L280,320 L380,360 L460,300 L560,340 L660,290 L760,330 L860,300 L960,340 L1060,310 L1200,360 L1200,500 L0,500 Z"
        fill="#567360"
        opacity="0.7"
      />
      {/* Front range — deep walnut shadow */}
      <path
        d="M0,470 L120,420 L220,440 L320,400 L440,440 L540,410 L660,440 L780,400 L900,440 L1020,420 L1200,460 L1200,500 L0,500 Z"
        fill="#274034"
        opacity="0.85"
      />
      {/* Snow caps on the highest peaks */}
      <path d="M520,260 L530,254 L545,265 L530,270 Z" fill="#D9C7B8" opacity="0.85" />
      <path d="M740,240 L750,232 L765,244 L750,250 Z" fill="#D9C7B8" opacity="0.85" />
      <path d="M840,180 L855,170 L875,184 L855,194 Z" fill="#D9C7B8" opacity="0.85" />
    </svg>
  );
}

export function Climate() {
  return (
    <section className="bg-forest text-linen py-24 lg:py-36 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, rgba(138,166,153,0.2), transparent 55%), radial-gradient(circle at 12% 88%, rgba(215,159,112,0.1), transparent 60%)',
        }}
      />
      <MountainBackdrop />
      <div className="relative max-w-site mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="font-body text-[12px] uppercase tracking-caps font-semibold text-lichen mb-4">
              Built for Colorado
            </div>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04]">
              Flooring installed with
              <br />
              <span className="italic">Front Range conditions</span> in mind.
            </h2>
            <p className="font-body text-linen/85 mt-6 max-w-prose">
              Flooring that performs well here requires thoughtful material selection, moisture
              awareness, and proper installation practices from the start.
            </p>
            <ul className="font-body text-linen/85 mt-5 max-w-prose space-y-2">
              {CLIMATE_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span aria-hidden className="text-camel mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-camel" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {/* Brand-styled callout for the hardwood-acclimation note. */}
            <aside className="mt-8 max-w-prose border-l-2 border-camel/60 pl-5 py-2">
              <div className="font-body text-[11px] uppercase tracking-caps font-semibold text-camel mb-1">
                On hardwood
              </div>
              <p className="font-display italic text-lg text-linen/95 leading-snug">
                Hardwood is acclimated on site before installation to help manage seasonal expansion
                and contraction.
              </p>
            </aside>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-linen/20 pt-5">
                <dt className="font-display text-camel text-[clamp(2.5rem,5vw,4rem)] leading-none flex items-center gap-2">
                  {s.big}
                  {s.star && (
                    <svg className="w-7 h-7 text-camel shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  )}
                </dt>
                <dd className="font-body text-[11px] uppercase tracking-caps text-lichen mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
