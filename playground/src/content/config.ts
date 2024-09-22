import { defineCollection, z } from "astro:content";
import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from "astro:env/server";
import { microCMSListLoader } from "microcms-astro-loader";

const microCMSConfig = {
  apiKey: MICROCMS_API_KEY,
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
};

const microCMSMeta = {
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  revisedAt: z.string().datetime(),
};

const microCMSImage = z.object({
  url: z.string().url(),
  height: z.number(),
  width: z.number(),
});

const news = defineCollection({
  loader: microCMSListLoader({
    ...microCMSConfig,
    endpoint: "news",
  }),
  schema: z.object({
    ...microCMSMeta,
    title: z.string(),
    description: z.string(),
    content: z.string(),
    thumbnail: microCMSImage.optional(),
  }),
});

const businesses = defineCollection({
  loader: microCMSListLoader({
    ...microCMSConfig,
    endpoint: "businesses",
  }),
  schema: z.object({
    ...microCMSMeta,
    logo: microCMSImage.optional(),
    description: z.string(),
    image: microCMSImage.optional(),
    link: z.string().url(),
  }),
});

const members = defineCollection({
  loader: microCMSListLoader({
    ...microCMSConfig,
    endpoint: "members",
  }),
  schema: z.object({
    ...microCMSMeta,
    name: z.string(),
    position: z.string(),
    profile: z.string(),
    image: microCMSImage.optional(),
  }),
});

export const collections = { news, businesses, members };
