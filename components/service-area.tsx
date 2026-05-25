import { ServiceAreaMap } from './service-area-map';

// Cities listed alphabetically. Numbered indicators removed 2026-05-24
// per Liza's brief — the numbers did not connect to anything on the map
// and read as noise. Plain italic city names with the same hover affordance.
const CITIES = [
  'Arvada',
  'Aurora',
  'Boulder',
  'Broomfield',
  'Centennial',
  'Cherry Hills Village',
  'Denver',
  'Englewood',
  'Highlands Ranch',
  'Lakewood',
  'Littleton',
  'Lone Tree',
  'Parker',
  'Westminster',
];

export function ServiceArea() {
  return (
    <section className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36 text-center">
      <div className="eyebrow mb-4">Where we work</div>
      {/*
        Copy refreshed 2026-05-24 per Liza's brief.
        - Headline: 'The Denver Metro Area & Front Range.'
        - Subhead consolidated: onsite/remote, minimum project size,
          and the will-travel line all into one paragraph above the map.
        - Removed the redundant 'Denver Metro Area · The Front Range'
          secondary line that lived below the map.
      */}
      <h2 className="display text-sage text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-3 max-w-[24ch] mx-auto">
        The Denver Metro Area
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> &amp; </span>
        <span className="sm:hidden block text-walnut-deep text-base uppercase tracking-caps font-body mt-1 mb-2">and the</span>
        <span className="italic">Front Range</span>.
      </h2>
      <p className="font-body text-onyx/80 max-w-prose mx-auto mb-10">
        Onsite or remote estimates available. Ask about minimum project size. Out-of-range location?
        If you are nearby and your project is the right fit, we will travel.
      </p>

      <div className="mb-12">
        <ServiceAreaMap />
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4 sm:gap-x-8 max-w-4xl mx-auto py-8 border-y border-walnut-deep/20">
        {CITIES.map((c) => (
          <li
            key={c}
            className="flex justify-start text-left whitespace-nowrap"
          >
            <span className="font-display italic text-espresso text-base sm:text-lg lg:text-xl">
              {c}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
