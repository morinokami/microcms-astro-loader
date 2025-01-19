# microcms-astro-loader

[English](./README.md)

Astro の [Content Layer](https://docs.astro.build/en/guides/content-collections/) に対応した [microCMS](https://microcms.io/) のコンテンツローダーです。

## インストール

```sh
npm install microcms-astro-loader
```

## 使い方

`src/content.config.ts` で、`microCMSContentLoader` 関数を使ってコレクションを定義します。この関数は、指定された microCMS エンドポイントからすべてのコンテンツを取得し、データストアに保存します。

```ts
import { defineCollection, z } from "astro:content";
import { microCMSContentLoader } from "microcms-astro-loader";

const posts = defineCollection({
  loader: microCMSContentLoader({
    apiKey: "your-microcms-api-key",
    serviceDomain: "your-microcms-service-domain",
    endpoint: "your-microcms-endpoint", // たとえば "blog" や "posts" など
  }),
  // コンテンツのスキーマを定義します
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

これにより、Astro ページでコンテンツを使用できるようになります:

```astro
---
import { getCollection } from "astro:content";

const posts = await getCollection("posts");
---

<ul>
  {posts.map((post) => <li>{post.data.title}</li>)}
</ul>
```

また、単一のオブジェクトをロードするための `microCMSObjectLoader` 関数もあります。`microCMSContentLoader` と同じように使用できますが、配列ではなく単一のオブジェクトを返します。

## デモ

このパッケージのデモプロジェクトを https://microcms-astro-loader-demo.vercel.app/ にデプロイしてあります。デモのソースコードは [`playground`](https://github.com/morinokami/microcms-astro-loader/tree/main/playground) ディレクトリから確認可能です。
