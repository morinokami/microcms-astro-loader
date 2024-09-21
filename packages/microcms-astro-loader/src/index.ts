import type { Loader } from "astro/loaders";
import { createClient } from "microcms-js-sdk";

interface LoaderOptions {
	apiKey: string;
	serviceDomain: string;
	endpoint: string;
}

export function microCMSListLoader({
	apiKey,
	serviceDomain,
	endpoint,
}: LoaderOptions): Loader {
	const client = createClient({
		apiKey,
		serviceDomain,
	});

	return {
		name: "microcms-list-loader",
		load: async ({ logger, store, parseData }) => {
			logger.info("Loading list data from microCMS");
			store.clear();

			const list = await client.getAllContents({ endpoint });
			for (const item of list) {
				const parsedData = await parseData({ id: item.id, data: item });
				store.set({ id: parsedData.id, data: parsedData });
			}

			logger.info("List data loaded");
		},
	};
}

export function microCMSObjectLoader({
	apiKey,
	serviceDomain,
	endpoint,
}: LoaderOptions): Loader {
	const client = createClient({
		apiKey,
		serviceDomain,
	});

	return {
		name: "microcms-object-loader",
		load: async ({ logger, store, parseData }) => {
			logger.info("Loading object data from microCMS");
			store.clear();

			const object = await client.getObject({ endpoint });
			const parsedData = await parseData({ id: endpoint, data: object });
			store.set({ id: endpoint, data: parsedData });

			logger.info("Object data loaded");
		},
	};
}
