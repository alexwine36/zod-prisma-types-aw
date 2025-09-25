/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { ExtendedWriteFieldOptions } from "../../types";
import { writeFieldAdditions } from ".";

export const writeDecimal = ({
	writer,
	field,
	model,
	writeOptionalDefaults = false,
	dmmf,
}: ExtendedWriteFieldOptions) => {
	const { isPrismaClientGenerator } = dmmf.generatorConfig;

	const decimalTypeName = isPrismaClientGenerator
		? "PrismaDecimal"
		: "Prisma.Decimal";

	writer
		.conditionalWrite(field.omitInModel(), "// omitted: ")
		.write(`${field.formattedNames.original}: `)
		.write(
			`z.instanceof(${decimalTypeName}, { message: "Field '${field.formattedNames.original}' must be a Decimal. Location: ['Models', '${model.formattedNames.original}']"`,
		)
		// .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
		// .write(`)`)
		// .write(`.refine((v) => isValidDecimalInput(v),`)
		// .write(
		//   ` { message: "Field '${field.formattedNames.original}' must be a Decimal. Location: ['Models', '${model.formattedNames.original}']", `,
		// )
		.write(`})`);
	// writer
	//   .conditionalWrite(field.omitInModel(), '// omitted: ')
	//   .write(`${field.formattedNames.original}: `)
	//   .write(`z.union([`)
	//   .write(`z.number(),`)
	//   .write(`z.string(),`)
	//   .write(`DecimalJSLikeSchema,`)
	//   .write(`]`)
	//   .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
	//   .write(`)`)
	//   .write(`.refine((v) => isValidDecimalInput(v),`)
	//   .write(
	//     ` { message: "Field '${field.formattedNames.original}' must be a Decimal. Location: ['Models', '${model.formattedNames.original}']", `,
	//   )
	//   .write(` })`);

	writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
