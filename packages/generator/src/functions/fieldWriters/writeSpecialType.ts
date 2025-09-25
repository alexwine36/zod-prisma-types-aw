/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { WriteTypeFunction, WriteTypeOptions } from "../../types";

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Checks if a type is a special type e.g. Bytes, Deciaml, Json.
 *
 * If yes, it writes the corresponding zod type - if no, it returns undefined.
 *
 * @param writer CodeBlockWriter
 * @param options WriteTypeFunction
 * @returns CodeBlockWriter | undefined
 */
export const writeSpecialType: WriteTypeFunction<WriteTypeOptions> = (
	writer,
	{
		inputType,
		isOptional,
		isNullable,
		writeComma = true,
		zodCustomErrors,
		zodCustomValidatorString,
	},
) => {
	if (!inputType.isSpecialType()) return;
	if (
		zodCustomValidatorString &&
		inputType.generatorConfig.addInputTypeValidation
	) {
		return writer
			.write(zodCustomValidatorString)
			.conditionalWrite(inputType.isList, `.array()`)
			.conditionalWrite(isOptional, `.optional()`)
			.conditionalWrite(isNullable, `.nullable()`)
			.conditionalWrite(writeComma, `,`);
	}

	if (inputType.isDecimalType) {
		if (inputType.isList) {
			return writer
				.write(`z.union([`)
				.write(`z.number().array(),`)
				.write(`z.string().array(),`)
				.conditionalWrite(
					inputType.generatorConfig.decimalJSInstalled,
					`z.instanceof(Decimal).array(),`,
				)
				.conditionalWrite(
					inputType.generatorConfig.isPrismaClientGenerator,
					`z.instanceof(PrismaDecimal).array(),`,
				)
				.conditionalWrite(
					!inputType.generatorConfig.isPrismaClientGenerator,
					`z.instanceof(Prisma.Decimal).array(),`,
				)
				.write(`DecimalJsLikeSchema.array(),`)
				.write(`]`)
				.conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors!}`)
				.write(`)`)

				.write(`.refine((v) => `)
				.write(
					`Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)),`,
				)
				.write(` { message: 'Must be a Decimal' })`)
				.conditionalWrite(isOptional, `.optional()`)
				.conditionalWrite(isNullable, `.nullable()`)
				.conditionalWrite(writeComma, `,`);
		}

		return writer
			.write(`z.union([`)
			.write(`z.number(),`)
			.write(`z.string(),`)
			.conditionalWrite(
				inputType.generatorConfig.decimalJSInstalled,
				`z.instanceof(Decimal),`,
			)
			.conditionalWrite(
				inputType.generatorConfig.isPrismaClientGenerator,
				`z.instanceof(PrismaDecimal),`,
			)
			.conditionalWrite(
				!inputType.generatorConfig.isPrismaClientGenerator,
				`z.instanceof(Prisma.Decimal),`,
			)
			.write(`DecimalJsLikeSchema,`)
			.write(`]`)
			.conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors!}`)
			.write(`)`)
			.write(`.refine((v) => isValidDecimalInput(v),`)
			.write(` { message: 'Must be a Decimal' })`)
			.conditionalWrite(isOptional, `.optional()`)
			.conditionalWrite(isNullable, `.nullable()`)
			.conditionalWrite(writeComma, `,`);
	}

	if (inputType.isJsonType) {
		return (
			writer
				.write(`InputJsonValueSchema`)
				// .conditionalWrite(!!zodCustomValidatorString, zodCustomValidatorString!)
				.conditionalWrite(inputType.isList, `.array()`)
				.conditionalWrite(isOptional, `.optional()`)
				.conditionalWrite(isNullable, `.nullable()`)
				.conditionalWrite(writeComma, `,`)
		);
	}

	if (inputType.isBytesType) {
		const prismaVersion = inputType.generatorConfig.prismaVersion;
		return writer
			.conditionalWrite(
				prismaVersion?.major === 6 || prismaVersion === undefined,
				`z.instanceof(Uint8Array<ArrayBufferLike>)`,
			)
			.conditionalWrite(
				prismaVersion?.major === 5 || prismaVersion?.major === 4,
				`z.instanceof(Buffer)`,
			)
			.conditionalWrite(inputType.isList, `.array()`)
			.conditionalWrite(isOptional, `.optional()`)
			.conditionalWrite(isNullable, `.nullable()`)
			.conditionalWrite(writeComma, `,`);
	}

	return writer
		.write(`z.null(),`)
		.conditionalWrite(!isOptional, `.optional()`)
		.conditionalWrite(isNullable, `.nullable()`)
		.conditionalWrite(writeComma, `,`);
};
