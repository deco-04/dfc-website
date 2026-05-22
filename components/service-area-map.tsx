// Real Google Maps embed showing the Denver Metro service area.
//
// Uses the no-API-key embed URL form (maps.google.com/maps?q=...&output=embed),
// which renders an interactive Google Map without needing the paid Maps
// Embed API or a billing account. Visitors can pan, zoom, click cities,
// and get directions — same UX as every other Google Maps embed.
//
// We center on Aurora at zoom 9 so the whole Front Range coverage area
// (Boulder up north, Parker south, Lakewood west, Aurora east) fits in a
// single viewport at desktop sizes. Mobile keeps the same center; users
// can pinch-zoom freely.
//
// Loading is lazy so the ~200KB Google Maps payload does not block LCP
// on the home page. The CSP allowlist for frame-src includes
// https://www.google.com (see public/_headers).

export function ServiceAreaMap() {
  return (
    <figure className="relative bg-linen-warm border border-walnut-deep/15 max-w-3xl mx-auto overflow-hidden">
      <iframe
        title="Denver Flooring Collective service area map. Centered on Denver, showing the full Denver Metro and Colorado Front Range coverage from Boulder north to Castle Rock south."
        // Centered on Denver at z=9 per user feedback 2026-05-22:
        // 'the default map view should be in Denver metro'. Zoom 9 keeps
        // Boulder (north), Castle Rock (south), Golden/Lakewood (west),
        // and Aurora/Bennett (east) all in the default viewport while
        // anchoring the visual focus on Denver itself — matches the
        // brand name and the canonical 'Denver Metro' framing.
        src="https://maps.google.com/maps?q=Denver,%20Colorado&t=m&z=9&ie=UTF8&iwloc=&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{
          width: '100%',
          height: '420px',
          border: 0,
          display: 'block',
        }}
      />
      <figcaption className="font-body text-[11px] uppercase tracking-caps font-semibold text-walnut-deep text-center px-6 py-4 border-t border-walnut-deep/15">
        Denver Metro core &middot; The Front Range &middot; We travel by default
      </figcaption>
    </figure>
  );
}
