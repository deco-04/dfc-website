import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
