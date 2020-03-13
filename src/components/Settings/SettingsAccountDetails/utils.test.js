import { doesContainJapaneseCharacters } from "./utils";

describe("SettingsAccountDetails/Utils", () => {
  describe("doesContainJapaneseCharacters", () => {
    test("should return FALSE if the string contains general characters only", () => {
      expect(doesContainJapaneseCharacters("abcdef")).toBe(false);
    });

    test("should return FALSE if the string contains both Japanese and general characters only", () => {
      expect(doesContainJapaneseCharacters("abcdefひらがな")).toBe(false);
    });

    test("should return TRUE if the string contains Japanese characters only", () => {
      expect(doesContainJapaneseCharacters("ひらがな")).toBe(true);
    });
  });
});
