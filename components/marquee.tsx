// Single-row marquee. Materials only, uniform style, paced for mobile readability.
// Alternates Camel + Lichen so the eye picks up rhythm without competing
// font sizes (the previous bar mixed display-italic + caps-meta which was
// visually noisy on small screens).
const SERVICES = [
  'Hardwood',
  'Engineered',
  'Luxury Vinyl Plank',
  'Laminate',
  'Tile & Shower',
  'Refinishing',
  'Staircases',
  'Subfloor Repair',
  'Basement Remodel',
  'Commercial',
];

export function Marquee() {
  // Duplicate so the CSS-only loop is seamless
  const doubled = [...SERVICES, ...SERVICES];
  return (
    <aside
      className="bg-espresso overflow-hidden py-5 sm:py-7 border-y border-camel/15 relative"
      aria-label="Services we install"
    >
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-espresso to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-espresso to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-6 sm:gap-10 whitespace-nowrap animate-marquee">
        {doubled.map((label, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-10">
            <span
              className={
                i % 2 === 0
                  ? 'font-display italic text-camel text-[1.4rem] sm:text-2xl lg:text-3xl'
                  : 'font-display italic text-lichen text-[1.4rem] sm:text-2xl lg:text-3xl'
              }
            >
              {label}
            </span>
            <span aria-hidden className="text-camel/35 text-base sm:text-xl select-none">
              &middot;
            </span>
          </span>
        ))}
      </div>
    </aside>
  );
}
