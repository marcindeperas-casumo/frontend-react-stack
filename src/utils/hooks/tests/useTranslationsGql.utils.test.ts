import { generateQueries } from "../useTranslationsGql.utils";

describe("useTranslationsGql.utils - generateQueries()", () => {
  const input = {
    one: "root:built-pages.top-lists-translations:fields.more_link",
    two: "root:built-pages.top-lists-translations:fields.more_link",
  };

  const expectedOutput = [
    'one: getCMSField(id: "root:built-pages.top-lists-translations:fields.more_link") { id, text }',
    'two: getCMSField(id: "root:built-pages.top-lists-translations:fields.more_link") { id, text }',
  ];

  test("it should generate the array of queries", () => {
    const generatedQueries = generateQueries(input);

    expect(generatedQueries).toEqual(expectedOutput);
  });
});
