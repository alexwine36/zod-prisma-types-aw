import type DMMF from "@prisma/dmmf";
import type { ReadonlyDeep } from "@prisma/dmmf/dist/util";
import type { GeneratorConfig } from "../schemas";
import { ExtendedDMMFEnum } from "./extendedDMMFEnum";
import { ExtendedDMMFIndex } from "./extendedDMMFIndex";
import {
	type ExtendedDMMFModel,
	ExtendedDMMFModelClass,
} from "./extendedDMMFModel";

export interface ExtendedDMMFDatamodelOptions {
	datamodel: DMMF.Datamodel;
	config: GeneratorConfig;
}

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

export class ExtendedDMMFDatamodel {
	readonly enums: ExtendedDMMFEnum[];
	readonly models: ExtendedDMMFModel[];
	readonly types: ExtendedDMMFModel[];
	readonly indexes: ExtendedDMMFIndex[];

	constructor(
		readonly generatorConfig: GeneratorConfig,
		datamodel: ReadonlyDeep<DMMF.Datamodel>,
	) {
		this.generatorConfig = generatorConfig;
		this.enums = this._getExtendedEnums(datamodel.enums);
		this.models = this._getExtendedModels(datamodel.models);
		this.indexes = this._getExtendedIndexes(datamodel.indexes);
		this.types = this._getExtendedModels(datamodel.types);
	}

	private _getExtendedModels(models: ReadonlyDeep<DMMF.Model[]>) {
		return models.map(
			(model) => new ExtendedDMMFModelClass(this.generatorConfig, model),
		);
	}

	private _getExtendedEnums(enums: ReadonlyDeep<DMMF.DatamodelEnum[]>) {
		return enums.map(
			(elem) => new ExtendedDMMFEnum(this.generatorConfig, elem),
		);
	}

	private _getExtendedIndexes(indexes: ReadonlyDeep<DMMF.Index[]>) {
		return indexes.map(
			(elem) => new ExtendedDMMFIndex(this.generatorConfig, elem),
		);
	}
}
