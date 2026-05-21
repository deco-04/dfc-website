// Custom SVG map of the Denver metro showing the cities we cover.
// Built as inline SVG so it ships zero JS, no third-party tracking,
// no API key, and renders identically across server + client. Editorial
// rather than literal: the layout is loosely geographic (relative
// north/south/east/west of Aurora preserved) so the eye picks up the
// "spread across the Front Range" story without pretending to be a
// navigation surface. Anyone needing directions can call.

type City = {
  name: string;
  // Geographic anchors normalized to a 0-100 viewBox. Aurora sits at the
  // visual center. Coordinates derived from real lat/lng then loosened so
  // labels can breathe without overlapping at mobile sizes.
  x: number;
  y: number;
  // Where to place the label relative to the dot
  anchor?: 'start' | 'middle' | 'end';
  // dy offset in viewBox units when the label sits above/below the dot
  dy?: number;
};

const CITIES: City[] = [
  { name: 'Boulder',              x: 18, y: 12, anchor: 'end',    dy: -3 },
  { name: 'Broomfield',           x: 36, y: 22, anchor: 'middle', dy: -3 },
  { name: 'Westminster',          x: 42, y: 28, anchor: 'middle', dy: -3 },
  { name: 'Arvada',               x: 36, y: 33, anchor: 'end',    dy: 4 },
  { name: 'Denver',               x: 50, y: 42, anchor: 'middle', dy: -3 },
  { name: 'Lakewood',             x: 40, y: 46, anchor: 'end',    dy: 4 },
  { name: 'Aurora',               x: 64, y: 46, anchor: 'start',  dy: -3 },
  { name: 'Englewood',            x: 49, y: 56, anchor: 'middle', dy: -3 },
  { name: 'Cherry Hills Village', x: 56, y: 60, anchor: 'start',  dy: 4 },
  { name: 'Littleton',            x: 42, y: 64, anchor: 'end',    dy: 4 },
  { name: 'Centennial',           x: 55, y: 68, anchor: 'middle', dy: 5 },
  { name: 'Highlands Ranch',      x: 44, y: 74, anchor: 'end',    dy: 4 },
  { name: 'Lone Tree',            x: 56, y: 78, anchor: 'start',  dy: 4 },
  { name: 'Parker',               x: 70, y: 80, anchor: 'start',  dy: -3 },
];

const HQ = { x: 64, y: 46 };

export function CoverageMap() {
  return (
    <figure
      role="img"
      aria-label="Service area map: Denver Flooring Collective covers Boulder, Broomfield, Westminster, Arvada, Denver, Lakewood, Aurora, Englewood, Cherry Hills Village, Littleton, Centennial, Highlands Ranch, Lone Tree, and Parker."
      className="relative bg-linen-warm border border-walnut-deep/15 px-6 py-8 sm:px-10 sm:py-12 max-w-3xl mx-auto"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        aria-hidden
      >
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.3" fill="#6B3F1F" fillOpacity="0.12" />
          </pattern>
          <radialGradient id="coverageFill" cx="64%" cy="46%" r="32%">
            <stop offset="0%" stopColor="#567360" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#567360" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#567360" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dot grid background */}
        <rect x="0" y="0" width="100" height="100" fill="url(#dotgrid)" />

        {/* Soft topographic contour rings, evoking the Front Range without literally drawing it */}
        <g stroke="#6B3F1F" strokeWidth="0.15" fill="none" opacity="0.18">
          <path d="M 5 40 Q 25 28, 50 35 T 95 25" />
          <path d="M 5 50 Q 25 38, 50 45 T 95 35" />
          <path d="M 5 60 Q 25 48, 50 55 T 95 45" />
        </g>

        {/* 25-mile coverage radius around Aurora HQ */}
        <circle cx={HQ.x} cy={HQ.y} r="32" fill="url(#coverageFill)" />
        <circle
          cx={HQ.x}
          cy={HQ.y}
          r="32"
          fill="none"
          stroke="#567360"
          strokeWidth="0.3"
          strokeDasharray="0.8 1.2"
          opacity="0.55"
        />

        {/* City dots + labels */}
        {CITIES.map((c) => {
          const isHq = c.name === 'Aurora';
          return (
            <g key={c.name}>
              <circle
                cx={c.x}
                cy={c.y}
                r={isHq ? 1.4 : 0.9}
                fill={isHq ? '#9B5236' : '#567360'}
              />
              {isHq && (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="2.6"
                  fill="none"
                  stroke="#9B5236"
                  strokeWidth="0.3"
                  opacity="0.5"
                />
              )}
              <text
                x={c.x + (c.anchor === 'end' ? -1.5 : c.anchor === 'start' ? 1.5 : 0)}
                y={c.y + (c.dy ?? -3)}
                textAnchor={c.anchor ?? 'middle'}
                className="font-body"
                fontSize="2.4"
                fill="#3D2817"
                fontWeight={isHq ? 600 : 400}
              >
                {c.name}
              </text>
            </g>
          );
        })}

        {/* North indicator */}
        <g transform="translate(92, 8)">
          <text x="0" y="0" textAnchor="middle" fontSize="2.2" fill="#6B3F1F" className="font-body">N</text>
          <path d="M 0 1.5 L 0 5" stroke="#6B3F1F" strokeWidth="0.3" />
          <path d="M -1 4 L 0 5 L 1 4" stroke="#6B3F1F" strokeWidth="0.3" fill="none" />
        </g>

        {/* Scale: "25 mi" reference next to the coverage ring */}
        <g transform="translate(6, 92)">
          <line x1="0" y1="0" x2="10" y2="0" stroke="#6B3F1F" strokeWidth="0.3" />
          <line x1="0" y1="-1" x2="0" y2="1" stroke="#6B3F1F" strokeWidth="0.3" />
          <line x1="10" y1="-1" x2="10" y2="1" stroke="#6B3F1F" strokeWidth="0.3" />
          <text x="5" y="3" textAnchor="middle" fontSize="2" fill="#6B3F1F" className="font-body">25 mi</text>
        </g>
      </svg>

      <figcaption className="font-body text-[11px] uppercase tracking-caps text-walnut-deep/75 text-center mt-4">
        25-mile coverage radius from Aurora &middot; <span className="text-flatiron font-semibold">DFC base</span>
      </figcaption>
    </figure>
  );
}
