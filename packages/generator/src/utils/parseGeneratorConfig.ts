import type { GeneratorOptions } from "@prisma/generator-helper";
import { configSchema } from "../schemas";
import { getDecimalJSInstalled } from "./getDecimalJSInstalled";
import { getPrismaClientGeneratorConfig } from "./getPrismaClientGeneratorConfig";
import { getPrismaClientProvider } from "./getPrismaDbProvider";
import { getPrismaVersion } from "./getPrismaVersion";

export const parseGeneratorConfig = (generatorOptions: GeneratorOptions) => {
	// Merge the generator config with the prisma client output path
	// The prisma client output path is automatically located

	return configSchema.parse({
		...generatorOptions.generator.config,
		...getPrismaClientGeneratorConfig(generatorOptions),
		...getPrismaClientProvider(generatorOptions),
		prismaVersion: getPrismaVersion(),
		decimalJSInstalled: getDecimalJSInstalled(),
	});
};
