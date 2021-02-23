import { compile } from "./utils";

describe("compile()", () => {
  test("returns same string if no replacements found", () => {
    const testString = "hello world";
    const result = compile(testString);
    const result2 = compile(testString, {});
    const result3 = compile(testString, { test: "test" });

    expect(result).toBe(testString);
    expect(result2).toBe(testString);
    expect(result3).toBe(testString);
  });

  test("replaces any keys from replacements object", () => {
    const testString = "hello {name}, {test2}";
    const result = compile(testString, {
      name: "test",
      test2: "it works",
    });

    expect(result).toBe("hello test, it works");
  });

  test("does not replace key if value provided is undefined/null", () => {
    const testString = "hello {name}, {test2}";
    const result = compile(testString, {
      test2: null,
    });

    expect(result).toBe(testString);
  });
});
