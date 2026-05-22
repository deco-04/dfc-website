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
        title="Denver Flooring Collective service area map. Centered on Denver, Colorado, showing the Denver Metro and Front Range coverage."
        // Centered on Denver per user feedback 2026-05-22. t=m road map,
        // z=10 fits the Denver Metro core (Boulder north, Parker south,
        // Lakewood west, Aurora east). iwloc=&output=embed strips the
        // default info-window.
        src="https://maps.google.com/maps?q=Denver,%20Colorado&t=m&z=10&ie=UTF8&iwloc=&output=embed"
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
