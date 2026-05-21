import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/calendar-website-onsite-free-estimate', destination: '/book',            permanent: true },
      { source: '/remote-estimate-form',                  destination: '/remote-estimate', permanent: true },
    ];
  },
};

export default nextConfig;
