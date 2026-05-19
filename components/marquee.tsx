const items = [
  'Hardwood', 'Aurora',
  'Engineered', 'Wash Park',
  'Luxury Vinyl Plank', 'Cherry Creek',
  'Laminate', 'Highlands Ranch',
  'Tile & Shower', 'Parker',
  'Refinishing', 'Lone Tree',
  'Staircases', 'Boulder',
  'Subfloor', 'Lakewood',
];

export function Marquee() {
  // duplicate the items so the CSS-only animation looks seamless
  const doubled = [...items, ...items];
  return (
    <aside className="bg-espresso overflow-hidden py-6 border-y border-camel/20 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-espresso to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-espresso to-transparent z-10 pointer-events-none" />
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {doubled.map((label, i) => (
          <span
            key={i}
            className={
              i % 2 === 0
                ? 'font-display italic text-camel text-3xl'
                : 'font-body text-heather/70 text-xs uppercase tracking-caps font-medium'
            }
          >
            {label}
          </span>
        ))}
      </div>
    </aside>
  );
}
