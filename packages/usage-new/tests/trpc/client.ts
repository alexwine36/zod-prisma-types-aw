import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import crossFetch from "cross-fetch";
import superjson from "superjson";
import type { AppRouter } from "./server";
import { PORT } from "../../utils/consts";

export const client = createTRPCProxyClient<AppRouter>({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: `http://localhost:${PORT}`,
			fetch: crossFetch,
		}),
	],
});
