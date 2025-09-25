import fs from "node:fs";
import { getDMMF } from "@prisma/internals";

export const loadDMMF = async (schemaPath: string) => {
	const datamodel = fs.readFileSync(schemaPath, "utf-8");

	const dmmf = await getDMMF({ datamodel });

	return dmmf;
};
