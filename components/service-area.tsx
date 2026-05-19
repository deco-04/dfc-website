const CITIES = [
  'Arvada', 'Aurora', 'Boulder', 'Broomfield',
  'Centennial', 'Cherry Hills Village', 'Denver', 'Englewood',
  'Highlands Ranch', 'Lakewood', 'Littleton', 'Lone Tree',
  'Parker', 'Westminster',
];

export function ServiceArea() {
  return (
    <section className="max-w-site mx-auto px-6 lg:px-12 py-24 lg:py-36 text-center">
      <div className="eyebrow mb-4">Where we work</div>
      <h2 className="display text-sage text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.04] mb-10">
        Denver core &amp; the <span className="italic">Front Range</span>.
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 max-w-3xl mx-auto py-8 border-y border-walnut-deep/20">
        {CITIES.map((c, i) => (
          <li key={c} className="flex items-baseline gap-3 justify-center md:justify-start">
            <span className="font-body text-[10px] uppercase tracking-caps text-walnut-deep">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display italic text-espresso text-lg lg:text-xl">{c}</span>
          </li>
        ))}
      </ul>
      <p className="font-body text-onyx/85 mt-6 max-w-prose mx-auto">
        If you are nearby and your project is the right fit, we will travel.
      </p>
    </section>
  );
}
