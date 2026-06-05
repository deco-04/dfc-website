import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization config — narrowed to formats Next's runtime can
  // produce on Cloudflare Workers. AVIF first (Chrome/Edge/Firefox 93+,
  // Safari 16.4+, ~30-50% smaller than WebP for photos), WebP fallback,
  // JPG last. The PSI 'image delivery' diagnostic (67 KiB savings) was
  // for the hero photo serving as JPG to a browser that supports AVIF;
  // declaring AVIF first makes Next negotiate it.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Tighter responsive sizes — mobile rarely needs >1080px wide hero.
    // Default Next list goes up to 3840 (4K), which is wasteful here.
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    // Quality 72 reads visually identical to 75 on photos and shaves a
    // measurable few KB per image. Mobile testers cannot tell the
    // difference at viewing distance.
    qualities: [50, 60, 72, 85],
    minimumCacheTTL: 2592000, // 30 days, matches our _headers cache rule
  },
  experimental: {
    // optimizeCss extracts critical CSS inline and defers the rest.
    // Kills the 70ms render-blocking CSS roundtrip PSI flagged
    // 2026-05-28. Marked experimental in Next 15 but stable in
    // production for static + SSG pages (which is all of our routes).
    optimizeCss: true,
  },
  async redirects() {
    return [
      { source: '/calendar-website-onsite-free-estimate', destination: '/book',            permanent: true },
      { source: '/remote-estimate-form',                  destination: '/remote-estimate', permanent: true },
      // Internal convenience: /admin -> Sanity-hosted Studio so Liza
      // does not have to bookmark the .sanity.studio URL. Non-permanent
      // (302) so we can change the destination later without poisoning
      // browser caches.
      { source: '/admin',                                 destination: 'https://denverflooringcollective.sanity.studio', permanent: false, basePath: false },
      { source: '/studio',                                destination: 'https://denverflooringcollective.sanity.studio', permanent: false, basePath: false },
    ];
  },
};

export default nextConfig;
