import { describe, expect, it } from "vitest";
import { configSchema } from "../../../../schemas";
import { getStringVariants } from "../../../../utils/getStringVariants";
import { ExtendedDMMF } from "../../../extendedDMMF";
import { loadDMMF } from "../../utils/loadDMMF";
import { DEFAULT_GENERATOR_CONFIG } from "./extendedDMMFField.test";

describe("testSimpleModelNoValidators", async () => {
	const dmmf = await loadDMMF(`${__dirname}/extendedDMMFModel.prisma`);
	const extendedDMMF = new ExtendedDMMF(dmmf, configSchema.parse({}));
	const model = extendedDMMF.datamodel.models[0];

	it("should set expected values in model", () => {
		expect(model.generatorConfig).toEqual(DEFAULT_GENERATOR_CONFIG);
		expect(model.formattedNames).toStrictEqual(getStringVariants(model.name));
		expect(model.scalarFields.length).toBe(2);
		expect(model.relationFields.length).toBe(0);
		expect(model.hasRelationFields).toBe(false);
		expect(model.fields.length).toBe(2);
	});
});
