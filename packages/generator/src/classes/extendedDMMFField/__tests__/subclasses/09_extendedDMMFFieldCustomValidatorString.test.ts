import type DMMF from "@prisma/dmmf";
import { describe, expect, it } from "vitest";
import type { GeneratorConfig } from "../../../../schemas/generatorConfigSchema";
import { ExtendedDMMFFieldCustomValidatorString } from "../../09_extendedDMMFFieldCustomValidatorString";
import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from "../setup";

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldCustomValdiatorString<
	T extends ExtendedDMMFFieldCustomValidatorString,
>(
	classConstructor: new (
		model: DMMF.Field,
		generatorConfig: GeneratorConfig,
		modelName: string,
	) => T,
) {
	const getField = (field?: Partial<DMMF.Field>) =>
		new classConstructor(
			{ ...FIELD_BASE, ...field },
			DEFAULT_GENERATOR_CONFIG,
			"ModelName",
		);

	describe(`ExtendedDMMFFieldCustomValidatorString`, () => {
		it(`should load class with docs and custom validator`, async () => {
			const field = getField({
				isList: true,
				documentation:
					"some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2))",
			});
			expect(field.zodCustomValidatorString).toBe("z.string().min(2).max(4)");
		});

		it(`should load class with docs and custom omit validator`, async () => {
			const field = getField({
				documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
			});
			expect(field.zodCustomValidatorString).toBeUndefined();
		});

		it(`should load class with docs and invalid validator for type string`, async () => {
			expect(() =>
				getField({
					documentation:
						"some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2)).wrong()",
				}),
			).toThrowError(
				"[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
			);
		});

		it(`should load class with nested validator string`, async () => {
			const field = getField({
				type: "Json",
				documentation:
					"some text in docs @zod.custom.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))",
			});

			expect(field.zodCustomValidatorString).toBe(
				"z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})",
			);
		});
	});
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldCustomValdiatorString(
	ExtendedDMMFFieldCustomValidatorString,
);
