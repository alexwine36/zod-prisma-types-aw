import { expect, it } from "vitest";

import { ExtendedDMMF } from "../../../ExtendedDMMF";
import { loadDMMF } from "../../utils/loadDMMF";

it("should throw if an invalid key is used", async () => {
	const dmmf = await loadDMMF(`${__dirname}/invalidType.prisma`);
	expect(() => new ExtendedDMMF(dmmf, {})).toThrowError(
		"[@zod generator error]: 'asdf' is not a valid validator type. [Error Location]: Model: 'MyModel', Field: 'custom'.",
	);
});
