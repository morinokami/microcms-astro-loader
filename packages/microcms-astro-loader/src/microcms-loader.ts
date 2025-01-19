import type { Loader } from "astro/loaders";
import { type MicroCMSQueries, createClient } from "microcms-js-sdk";

interface ContentLoaderOptions {
	apiKey: string;
	serviceDomain: string;
	endpoint: string;
	queries?: Omit<MicroCMSQueries, "limit" | "offset" | "ids">;
}

export function microCMSContentLoader({
	apiKey,
	serviceDomain,
	endpoint,
	queries,
}: ContentLoaderOptions): Loader {
	const client = createClient({
		apiKey,
		serviceDomain,
	});

	return {
		name: "microcms-content-loader",
		load: async ({ logger, store, parseData }) => {
			try {
				logger.info(`Loading content data ${endpoint} from microCMS`);
				store.clear();

				const contents = await client.getAllContents({ endpoint, queries });
				for (const item of contents) {
					const parsedData = await parseData({ id: item.id, data: item });
					store.set({ id: parsedData.id, data: parsedData });
				}

				logger.info(`${endpoint} loaded`);
			} catch (error) {
				logger.error(`Failed to load content data ${endpoint}`);
			}
		},
	};
}

interface ObjectLoaderOptions {
	apiKey: string;
	serviceDomain: string;
	endpoint: string;
	queries?: MicroCMSQueries;
}

export function microCMSObjectLoader({
	apiKey,
	serviceDomain,
	endpoint,
	queries,
}: ObjectLoaderOptions): Loader {
	const client = createClient({
		apiKey,
		serviceDomain,
	});

	return {
		name: "microcms-object-loader",
		load: async ({ logger, store, parseData }) => {
			try {
				logger.info(`Loading object data ${endpoint} from microCMS`);
				store.clear();

				const object = await client.getObject({ endpoint, queries });
				const parsedData = await parseData({ id: endpoint, data: object });
				store.set({ id: endpoint, data: parsedData });

				logger.info(`${endpoint} loaded`);
			} catch (error) {
				logger.error(`Failed to load object data ${endpoint}`);
			}
		},
	};
}
