// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	image: {
    domains: ['images.microcms-assets.io'],
  },
  integrations: [react()],
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});
