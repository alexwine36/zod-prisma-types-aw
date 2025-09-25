import type DMMF from "@prisma/dmmf";
import { describe, expect, it } from "vitest";
import type { GeneratorConfig } from "../../../../schemas/generatorConfigSchema";
import { ExtendedDMMFModelImportStatement } from "../../05_extendedDMMFModelImportStatement";
import {
	DEFAULT_GENERATOR_CONFIG,
	MODEL_BASE,
	MODEL_WITH_AUTO_IMPORT_FILDS,
} from "../setup";

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldImportStatement<
	T extends ExtendedDMMFModelImportStatement,
>(
	classConstructor: new (
		generatorConfig: GeneratorConfig,
		model: DMMF.Model,
	) => T,
) {
	const getModel = (model?: Partial<DMMF.Model>) =>
		new classConstructor(DEFAULT_GENERATOR_CONFIG, {
			...MODEL_BASE,
			...model,
		});

	describe(`ExtendedDMMFFieldValidatorPattern`, () => {
		it(`should find all import statements`, async () => {
			const model = getModel({
				documentation:
					'some text in docs before @zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"]).refine(v => v.title.length > 0).import(["import { myOtherFunction } from "../../../../utils/myOtherFunction";"]) some text after',
			});

			expect(model?._validatorList).toEqual([
				'.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"])',
				".refine(v => v.title.length > 0)",
				'.import(["import { myOtherFunction } from "../../../../utils/myOtherFunction";"])',
			]);

			expect(model?._importStatements).toEqual([
				'"import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"',
				'"import { myOtherFunction } from "../../../../utils/myOtherFunction";"',
			]);

			expect(model.modelImports).toEqual(
				new Set([
					"import { myFunction } from '../../../../utils/myFunction';",
					"import validator from 'validator';",
					"import { myOtherFunction } from '../../../../utils/myOtherFunction';",
				]),
			);

			expect(model.imports).toEqual(
				new Set([
					"import { myFunction } from '../../../../utils/myFunction';",
					"import validator from 'validator';",
					"import { myOtherFunction } from '../../../../utils/myOtherFunction';",
				]),
			);
		});

		it(`should remove double imports`, async () => {
			const model = getModel({
				documentation:
					'@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
			});

			expect(model?._validatorList).toEqual([
				'.import(["import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"])',
			]);

			expect(model?._importStatements).toEqual([
				'"import { myFunction } from "../../../../utils/myFunction";", "import { myFunction } from "../../../../utils/myFunction";"',
			]);

			expect(model.modelImports).toEqual(
				new Set(["import { myFunction } from '../../../../utils/myFunction';"]),
			);
			expect(model.imports).toEqual(
				new Set(["import { myFunction } from '../../../../utils/myFunction';"]),
			);
		});

		it("should not load a class with invalid characters in import pattern", async () => {
			expect(() =>
				getModel({
					documentation:
						'some text in docs before @zod.import(["import { myFunction } from "+../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict() some text after',
				}),
			).toThrowError(
				`[@zod generator error]: import statement is not valid. Check for unusal characters. [Error Location]: Model: 'User'`,
			);
		});

		it(`should load a class with automatic imports`, async () => {
			const model = getModel(MODEL_WITH_AUTO_IMPORT_FILDS);

			expect(model?._automaticImports).toEqual([
				`import { JsonValueSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/JsonValueSchema'`,
				`import { Prisma } from '@prisma/client'`,
				`import { RoleSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/RoleSchema'`,
			]);
		});

		it(`should load a class with automatic and custom imports`, async () => {
			const model = getModel({
				...MODEL_WITH_AUTO_IMPORT_FILDS,
				documentation:
					'@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"])',
			});

			expect(model.imports).toEqual(
				new Set([
					"import validator from 'validator';",
					`import { JsonValueSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/JsonValueSchema'`,
					`import { Prisma } from '@prisma/client'`,
					`import { RoleSchema } from '../${DEFAULT_GENERATOR_CONFIG.inputTypePath}/RoleSchema'`,
					"import { myFunction } from '../../../../utils/myFunction';",
				]),
			);
		});

		it("should set fieldImports to the values of the fields 'imports' property", async () => {
			const model = getModel({
				fields: [
					{
						...MODEL_BASE.fields[0],
						documentation:
							'@zod.import(["import { myFunction } from "../../../../utils/myFunction";", "import validator from "validator";"]).number.gt(0)',
					},
				],
			});

			expect(model.fieldImports).toEqual(
				new Set([
					"import validator from 'validator';",
					"import { myFunction } from '../../../../utils/myFunction';",
				]),
			);
		});
	});
}

///////////////////////////////////////////////
// TEST EXECUTION
///////////////////////////////////////////////

testExtendedDMMFFieldImportStatement(ExtendedDMMFModelImportStatement);
