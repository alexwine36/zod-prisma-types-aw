import { FileWriter } from "./classes";
import {
	writeSingleFileArgTypeStatements,
	writeSingleFileEnumStatements,
	writeSingleFileHelperStatements,
	writeSingleFileImportStatements,
	writeSingleFileIncludeSelectStatements,
	writeSingleFileInputTypeStatements,
	writeSingleFileModelStatements,
	writeSingleFileTypeStatements,
} from "./functions";
import type { CreateOptions } from "./types";

export const generateSingleFile = ({ dmmf, path }: CreateOptions) => {
	new FileWriter().createFile(`${path}/index.ts`, (fileWriter) => {
		writeSingleFileImportStatements(dmmf, fileWriter);
		writeSingleFileHelperStatements(dmmf, fileWriter);
		writeSingleFileEnumStatements(dmmf, fileWriter);
		writeSingleFileModelStatements(dmmf, fileWriter);
		writeSingleFileTypeStatements(dmmf, fileWriter);
		writeSingleFileIncludeSelectStatements(dmmf, fileWriter);
		writeSingleFileInputTypeStatements(dmmf, fileWriter);
		writeSingleFileArgTypeStatements(dmmf, fileWriter);
	});
};
