# microcms-astro-loader

[microCMS](https://microcms.io/) Content Loader for the Astro Content Layer.

## Install

```sh
npm install microcms-astro-loader
```

## Usage

In your `src/content/config.ts`, define your collections with the `microCMSContentLoader` function. This function will fetch all the content from the specified microCMS endpoint and store it in the data store.

```ts
import { defineCollection, z } from "astro:content";
import { microCMSContentLoader } from "microcms-astro-loader";

const posts = defineCollection({
  loader: microCMSContentLoader({
    apiKey: "your-microcms-api-key",
    serviceDomain: "your-microcms-service-domain",
    endpoint: "your-microcms-endpoint", // e.g. "blog" or "posts"
  }),
  // Define the schema of the content
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    thumbnail: z.object({
      url: z.string().url(),
      height: z.number(),
      width: z.number(),
    }).optional(),
  }),
});

export const collections = { posts };
```

You can then use the content in your Astro pages:

```astro
---
import { getCollection } from "astro:content";

const posts = await getCollection("posts");
---

<ul>
  {posts.map((post) => <li>{post.data.title}</li>)}
</ul>
```

There is also the `microCMSObjectLoader` function, which is useful for loading a single object. You can use it in the same way as `microCMSContentLoader`, but it will return a single object instead of an array.
