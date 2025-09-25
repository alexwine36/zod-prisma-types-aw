import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import crossFetch from "cross-fetch";
import superjson from "superjson";
import { PORT } from "../../utils/consts";
import type { AppRouter } from "./server";

export const client = createTRPCProxyClient<AppRouter>({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: `http://localhost:${PORT}`,
			fetch: crossFetch,
		}),
	],
});
