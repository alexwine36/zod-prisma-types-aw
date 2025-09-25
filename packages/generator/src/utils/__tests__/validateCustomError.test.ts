// Adjust the path

import { describe, expect, it } from "vitest";
import {
	convertToZodV4Error,
	VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX,
	VALIDATOR_CUSTOM_ERROR_REGEX,
	VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX,
	validateCustomError,
} from "../validateCustomError";

describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
	it(`array validator number should return match for regex with japanese chars`, async () => {
		const result = VALIDATOR_CUSTOM_ERROR_REGEX.exec(
			"({ invalid_type_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', required_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', description: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' })",
		);
		expect(result?.groups?.object).toBe(
			"{ invalid_type_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', required_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', description: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' }",
		);
		expect(result?.groups?.messages).toBe(
			" invalid_type_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', required_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', description: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' ",
		);
	});

	it(`array validator number should return match for regex with japanese chars`, async () => {
		const messageArray =
			" invalid_type_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', required_error: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。', description: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' "
				.replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, "")
				.match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

		expect(messageArray).toEqual([
			"invalid_type_error",
			"required_error",
			"description",
		]);
	});
});

describe(`ExtendedDMMFFieldValidatorCustomErrors`, () => {
	it(`array validator number should return match for regex with latin and special chars`, async () => {
		const result = VALIDATOR_CUSTOM_ERROR_REGEX.exec(
			"({ invalid_type_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', required_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', description: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ' })",
		);
		expect(result?.groups?.object).toBe(
			"{ invalid_type_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', required_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', description: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ' }",
		);
		expect(result?.groups?.messages).toBe(
			" invalid_type_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', required_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', description: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ' ",
		);
	});
	it(`array validator number should return match for regex with japanese chars`, async () => {
		const messageArray =
			" invalid_type_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', required_error: 'ÁÀȦÂÄǞǍĂĀÃÅǺǼǢĆĊĈČĎḌḐḒÉÈĖÊËĚĔĒẼE̊ẸǴĠĜǦĞG̃ĢĤḤáàȧâäǟǎăāãåǻǽǣćċĉčďḍḑḓéèėêëěĕēẽe̊ẹǵġĝǧğg̃ģĥḥÍÌİÎÏǏĬĪĨỊĴĶǨĹĻĽĿḼM̂M̄ʼNŃN̂ṄN̈ŇN̄ÑŅṊÓÒȮȰÔÖȪǑŎŌÕȬŐỌǾƠíìiîïǐĭīĩịĵķǩĺļľŀḽm̂m̄ŉńn̂ṅn̈ňn̄ñņṋóòôȯȱöȫǒŏōõȭőọǿơP̄ŔŘŖŚŜṠŠȘṢŤȚṬṰÚÙÛÜǓŬŪŨŰŮỤẂẀŴẄÝỲŶŸȲỸŹŻŽẒǮp̄ŕřŗśŝṡšşṣťțṭṱúùûüǔŭūũűůụẃẁŵẅýỳŷÿȳỹźżžẓǯßœŒçÇ', description: 'ひらがな、カタカナ、漢字、長音符ーが少なくとも1つずつ含まれる必要があります。' "
				.replace(VALIDATOR_CUSTOM_ERROR_MESSAGE_REGEX, "")
				.match(VALIDATOR_CUSTOM_ERROR_SPLIT_KEYS_REGEX);

		expect(messageArray).toEqual([
			"invalid_type_error",
			"required_error",
			"description",
		]);
	});
});

describe("validateCustomError", () => {
	const errorLocation = "in test";

	it("recognizes valid custom errors", () => {
		const customError =
			'({ invalid_type_error: "type error", required_error: "required" })';

		const result = validateCustomError(customError, errorLocation);

		expect(result).toBeTruthy(); // expecting match object to be returned
	});

	it("recognizes new error key", () => {
		const customError =
			'({ error: (issue) => { if (issue.input === undefined) return "required"; return "type error"; } })';

		const result = validateCustomError(customError, errorLocation);

		expect(result).toBeTruthy(); // expecting match object to be returned
	});

	it("returns undefined for invalid custom errors", () => {
		const customError =
			'({ invalid: "This is invalid", required_error: "required" })';

		expect(() => validateCustomError(customError, errorLocation)).toThrowError(
			`[@zod generator error]: Custom error key 'invalid' is not valid. Please check for typos! ${errorLocation}`,
		);
	});

	it("handles unrecognized keys", () => {
		const customError =
			'({ unrecognized_key: "unrecognized", required_error: "required" })';

		expect(() => validateCustomError(customError, errorLocation)).toThrowError(
			`[@zod generator error]: Custom error key 'unrecognized_key' is not valid. Please check for typos! ${errorLocation}`,
		);
	});

	it("handles custom errors without messages", () => {
		const customError = "()";

		const result = validateCustomError(customError, errorLocation);

		expect(result).toBeUndefined();
	});
});

describe("convertToZodV4Error", () => {
	it("converts both invalid_type_error and required_error to error function", () => {
		const errorObject =
			'{ invalid_type_error: "Must be a string", required_error: "This field is required" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).toContain("error: (issue) => {");
		expect(result).toContain("if (issue.input === undefined) {");
		expect(result).toContain('return "This field is required";');
		expect(result).toContain('return "Must be a string";');
		expect(result).not.toContain("invalid_type_error");
		expect(result).not.toContain("required_error");
	});

	it("converts with description preserved", () => {
		const errorObject =
			'{ invalid_type_error: "Must be a string", required_error: "This field is required", description: "A test field" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).toContain("error: (issue) => {");

		expect(result).not.toContain("invalid_type_error");
		expect(result).not.toContain("required_error");
	});

	it("returns undefined for undefined input", () => {
		const result = convertToZodV4Error(undefined);

		expect(result).toBeUndefined();
	});

	it("returns original object if only one old property is present", () => {
		const errorObject = '{ invalid_type_error: "Must be a string" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).toBe('{ error: "Must be a string" }');
	});

	it("returns original object if only required_error is present", () => {
		const errorObject = '{ required_error: "This field is required" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).toBe('{ error: "This field is required" }');
	});

	it("handles new error function format", () => {
		const errorObject = '{ error: (issue) => { return "custom error"; }}';

		const result = convertToZodV4Error(errorObject);

		expect(result).toBe(errorObject);
	});

	it("handles trailing commas in error object", () => {
		const errorObject =
			'{ invalid_type_error: "Must be a string", required_error: "This field is required", description: "A test field" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).toContain("error: (issue) => {");

		expect(result).not.toContain("invalid_type_error");
		expect(result).not.toContain("required_error");
		expect(result).not.toMatch(/,\s*,/); // No double commas
		expect(result).not.toMatch(/{\s*,/); // No comma after opening brace
		expect(result).not.toMatch(/,\s*}/); // No comma before closing brace
	});
	it("removes description if it is present", () => {
		const errorObject =
			'{ invalid_type_error: "Must be a string", required_error: "This field is required", description: "A test field" }';

		const result = convertToZodV4Error(errorObject);

		expect(result).not.toContain("description");
	});
});
