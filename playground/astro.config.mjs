// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://astro.build/config
export default defineConfig({
  site: "https://microcms-astro-loader-demo.vercel.app",
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
  vite: {
    plugins: [vanillaExtractPlugin()],
  },
});
