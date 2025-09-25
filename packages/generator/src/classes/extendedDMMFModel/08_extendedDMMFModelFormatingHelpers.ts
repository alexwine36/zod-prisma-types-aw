import type DMMF from "@prisma/dmmf";
import type { GeneratorConfig } from "../../schemas";
import { ExtendedDMMFModelCustomValidators } from "./07_extendedDMMFModelCustomValidators";

export class ExtendedDMMFModelFormatingHelpers extends ExtendedDMMFModelCustomValidators {
	readonly optionalJsonFieldUnion: string;

	constructor(generatorConfig: GeneratorConfig, model: DMMF.Model) {
		super(generatorConfig, model);

		this.optionalJsonFieldUnion = this._setOptionalJsonFieldUnion();
	}

	private _setOptionalJsonFieldUnion() {
		return this.optionalJsonFields
			.map((field) => `"${field.name}"`)
			.join(" | ");
	}
}
