import { removeScriptTags, parseCmsPaymentConfig } from "./cmsConfig.utils";

const mock = '<script>{"param": "value"}</script>';
const parsed = { param: "value" };

describe("CMS payment config utils", () => {
  describe("removeStripTags()", () => {
    test("should strip tags from given content", () => {
      const emptyContent = "<script></script>";

      expect(removeScriptTags(emptyContent)).toEqual("");
    });

    test("should strip tags from given content", () => {
      expect(removeScriptTags(mock)).toEqual('{"param": "value"}');
    });
  });

  describe("tryParseJson()", () => {
    test("should return parsed json from given content", () => {
      expect(parseCmsPaymentConfig(mock)).toEqual(parsed);
    });
  });
});
