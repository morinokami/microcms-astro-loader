// @ts-check
import react from "@astrojs/react";
import vercel from '@astrojs/vercel';
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://microcms-astro-loader-demo.vercel.app",
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),
  env: {
    schema: {
      MICROCMS_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      MICROCMS_SERVICE_DOMAIN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  image: {
    domains: ["images.microcms-assets.io"],
  },
  integrations: [react()],
});
