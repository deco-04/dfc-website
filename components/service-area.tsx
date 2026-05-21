import { CoverageMap } from './coverage-map';

// Cities ordered alphabetically. Display size + grid columns tuned so the
// longest names ("Cherry Hills Village", "Highlands Ranch") render on a
// single line at every breakpoint.
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
      <h2 className="display text-sage text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05] mb-3 max-w-[20ch] mx-auto">
        Denver core
        <br className="sm:hidden" />
        <span className="hidden sm:inline"> &amp; </span>
        <span className="sm:hidden block text-walnut-deep text-base uppercase tracking-caps font-body mt-1 mb-2">and the</span>
        <span className="italic">Front Range</span>.
      </h2>
      <p className="font-body text-onyx/70 max-w-prose mx-auto text-sm mb-10">
        Within 25 miles of Aurora. Beyond that, we still travel. Ask about minimum project size.
      </p>

      <div className="mb-12">
        <CoverageMap />
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4 sm:gap-x-8 max-w-4xl mx-auto py-8 border-y border-walnut-deep/20">
        {CITIES.map((c, i) => (
          <li
            key={c}
            className="flex items-baseline gap-2 sm:gap-3 justify-start text-left whitespace-nowrap"
          >
            <span className="font-body text-[10px] uppercase tracking-caps text-walnut-deep min-w-[1.5ch]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display italic text-espresso text-base sm:text-lg lg:text-xl">
              {c}
            </span>
          </li>
        ))}
      </ul>

      <p className="font-body text-onyx/85 mt-6 max-w-prose mx-auto">
        If you are nearby and your project is the right fit, we will travel.
      </p>
    </section>
  );
}
