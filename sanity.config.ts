import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'dfc',
  title: 'Denver Flooring Collective',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k0jdv8n4',
  dataset: 'production',
  // basePath '/' because Studio is hosted at denverflooringcollective.sanity.studio (root).
  // When running locally via `pnpm exec sanity dev`, Studio serves itself on its own port.
  basePath: '/',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
