import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'gic-content',
  title: 'GIC Global Connect',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '9vtgv0rl',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
