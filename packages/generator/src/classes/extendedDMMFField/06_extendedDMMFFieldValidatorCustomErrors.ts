import type DMMF from "@prisma/dmmf";
import type { GeneratorConfig } from "../../schemas";
import {
	convertToZodV4Error,
	validateCustomError,
} from "../../utils/validateCustomError";
import { ExtendedDMMFFieldDefaultValidators } from "./05_extendedDMMFFieldDefaultValidators";

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFFieldValidatorCustomErrors extends ExtendedDMMFFieldDefaultValidators {
	_validatorCustomError?: string;
	readonly zodCustomErrors?: string;

	constructor(
		field: DMMF.Field,
		generatorConfig: GeneratorConfig,
		modelName: string,
	) {
		super(field, generatorConfig, modelName);

		this._validatorCustomError = this._setValidatorCustomError();
		this.zodCustomErrors = this._setZodCustomErrors();
	}

	private _setValidatorCustomError() {
		if (!this._validatorMatch) return;
		return this._validatorMatch?.groups?.["customErrors"];
	}

	private _setZodCustomErrors() {
		if (!this._validatorCustomError) return;

		const validatedError = validateCustomError(
			this._validatorCustomError,
			this._errorLocation,
		);
		return convertToZodV4Error(validatedError);
	}
}
