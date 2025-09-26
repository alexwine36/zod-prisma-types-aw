import Decimal from "decimal.js";
import { z } from "zod";
import {
	BidSchema,
	DecimalJsLikeSchema,
	EstimateSchema,
	isValidDecimalInput,
} from "../../prisma/generated/zod";

export const DecimalInput = z
	.union([
		z.number(),
		z.string(),
		z.instanceof(Decimal),
		// z.instanceof(Prisma.Decimal),
		DecimalJsLikeSchema,
	])
	.refine((v) => isValidDecimalInput(v), {
		error: "Must be a Decimal",
	});

export const EstimateData = EstimateSchema.extend({
	// Update base types here
	subtotal: z.number(),
	taxAmount: z.number(),
	total: z.number(),
	overheadPercent: z.number().nullish(),
	profitPercent: z.number().nullish(),
	// client: ClientData.nullish(),
	clientName: z.string().nullish(),
});

export const BidData = BidSchema.extend({
	subtotal: z.number(),
	taxAmount: z.number(),
	total: z.number(),
	estimate: EstimateData.pick({
		id: true,
		name: true,
		description: true,
	}),
	clientName: z.string().nullish(),
});

export type BidData = z.infer<typeof BidData>;

export const BidUpdateInput = BidData.omit({
	createdAt: true,
	updatedAt: true,
	organizationId: true,
	estimate: true,
	client: true,
	clientId: true,
}).extend({
	subtotal: DecimalInput,
	taxAmount: DecimalInput,
	total: DecimalInput,
});

export type BidUpdateInput = z.infer<typeof BidUpdateInput>;

export const BidInput = BidUpdateInput.partial({
	id: true,
});
export type BidInput = z.infer<typeof BidInput>;
