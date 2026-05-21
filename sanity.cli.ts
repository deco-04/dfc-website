import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  // Sanity-hosted Studio URL: https://denverflooringcollective.sanity.studio
  // Pinning studioHost here so `pnpm exec sanity deploy` does not re-prompt.
  studioHost: 'denverflooringcollective',
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k0jdv8n4',
    dataset: 'production',
  },
});
