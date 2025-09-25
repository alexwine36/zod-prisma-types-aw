/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

export type ZodCustomErrorKey =
	| "invalid_type_error"
	| "required_error"
	| "error"
	| "description";

/////////////////////////////////////////////////
// REGEX
/////////////////////////////////////////////////

export const VALIDATOR_CUSTOM_ERROR_REGEX =
	/(\()(?<object>\{(?<messages>[\w\W\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+)\})(\))/u;

// !!!! non word characters (/W) must not be included in the regex
// since it would break the split into an array !!!!

export const VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX =
	/[ ]?"[\w\p{Script=Cyrillic}\p{Script=Latin}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{M} ()-.,'ʼ:+\-*#!§$%&/{}[\]=?~><°^|]+"[,]?[ ]?/gu;

export const VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX = /[\w]+(?=:)/gu;

/////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////

export const ZOD_VALID_ERROR_KEYS: ZodCustomErrorKey[] = [
	"invalid_type_error",
	"required_error",
	"error",
	"description",
];

/////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////

/**
 * Validates the custom error string and returns the match object.
 * @param customError
 * @param isInvalidKey callback function to handle invalid keys
 * @returns match object
 */

export const validateCustomError = (
	customError: string,

	errorLocation: string,
) => {
	const match = customError.match(VALIDATOR_CUSTOM_ERROR_REGEX);
	const messages = match?.groups?.["messages"];
	const object = match?.groups?.["object"];

	if (!messages) return;

	const customErrorKeysArray = messages
		.replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, "")
		.match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

	const isValid = customErrorKeysArray?.every((key) => {
		if (ZOD_VALID_ERROR_KEYS?.includes(key as ZodCustomErrorKey)) return true;

		throw new Error(
			`[@zod generator error]: Custom error key '${key}' is not valid. Please check for typos! ${errorLocation}`,
		);
	});

	return isValid ? object : undefined;
};

/**
 * Converts old Zod v3 error format to new Zod v4 error format.
 * Transforms invalid_type_error and required_error properties into a unified error function.
 * @param errorObject The error object string from the parsed custom error
 * @returns Converted error object string for Zod v4
 */
export const convertToZodV4Error = (
	errorObject?: string,
): string | undefined => {
	if (!errorObject) return undefined;

	// Parse the error object to extract individual error messages
	const invalidTypeMatch = errorObject.match(/invalid_type_error:\s*"([^"]+)"/);
	const requiredErrorMatch = errorObject.match(/required_error:\s*"([^"]+)"/);
	const descriptionMatch = errorObject.match(/description:\s*"([^"]+)"/);

	const invalidTypeError = invalidTypeMatch?.[1];
	const requiredError = requiredErrorMatch?.[1];
	const description = descriptionMatch?.[1];

	// If both invalid_type_error and required_error are present, convert to error function
	if (invalidTypeError && requiredError) {
		const errorFunction = `error: (issue) => {
			if (issue.input === undefined) {
				return "${requiredError}";
			}
			return "${invalidTypeError}";
		}`;

		// Replace the old properties with the new error function
		let newErrorObject = errorObject
			.replace(/invalid_type_error:\s*"[^"]+",?\s*/, "")
			.replace(/required_error:\s*"[^"]+",?\s*/, "");

		// Clean up any remaining commas and whitespace
		newErrorObject = newErrorObject
			.replace(/,\s*,/g, ",")
			.replace(/,\s*\}/g, "}")
			.replace(/{\s*,/g, "{");

		// Add the new error function
		if (description) {
			// If description exists, insert error function before it
			newErrorObject = newErrorObject.replace(
				/(description:\s*"[^"]+")/,
				`${errorFunction}`,
			);
		} else {
			// If no description, just add the error function
			newErrorObject = newErrorObject.replace(/^\{/, `{${errorFunction}`);
		}

		return newErrorObject;
	} else {
		if (description || requiredError || invalidTypeError) {
			return `{ error: "${description || requiredError || invalidTypeError}" }`;
		}

		// return errorObject;
	}

	// If only one of the old properties is present, keep it as is for backward compatibility
	// but warn that it should be updated
	return errorObject;
};
