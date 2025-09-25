import type { ContentWriterOptions } from "../../types";

export const writeDecimalJsLike = ({
	fileWriter: { writer, writeImport },
	dmmf,
	getSingleFileContent = false,
}: ContentWriterOptions) => {
	const {
		useMultipleFiles,
		prismaClientPath,
		prismaLibraryPath,
		isPrismaClientGenerator,
	} = dmmf.generatorConfig;

	if (useMultipleFiles && !getSingleFileContent) {
		writeImport("{ z }", "zod");
		if (isPrismaClientGenerator) {
			writeImport("type { DecimalJsLike }", `${prismaLibraryPath}`);
		} else {
			writeImport("type { Prisma }", `${prismaClientPath}`);
		}
	}

	const decimalJsLikeTypeName = isPrismaClientGenerator
		? "DecimalJsLike"
		: "Prisma.DecimalJsLike";

	writer
		.blankLine()
		.writeLine(
			`export const DecimalJsLikeSchema: z.ZodType<${decimalJsLikeTypeName}> = z.object({`,
		)
		.withIndentationLevel(1, () => {
			writer
				.writeLine(`d: z.array(z.number()),`)
				.writeLine(`e: z.number(),`)
				.writeLine(`s: z.number(),`)
				.writeLine(
					`toFixed: z.function({input: z.tuple([]), output: z.string()}),`,
				);
		})
		.writeLine(`})`);

	if (useMultipleFiles && !getSingleFileContent) {
		writer.blankLine().writeLine(`export default DecimalJsLikeSchema;`);
	}
};
