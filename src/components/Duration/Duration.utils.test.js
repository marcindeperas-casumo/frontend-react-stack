// @flow
import { durationToTranslationKey } from "./Duration.utils";

describe("Components/Duration.utils", () => {
  describe("durationToTranslationKey()", () => {
    test("it returns week_abbreviated if preferAbbreviated is true and week is requested", () => {
      expect(durationToTranslationKey("weeks", 3, true)).toEqual(
        "week_abbreviated"
      );
    });

    test("it returns day_plural if value is greater than 1", () => {
      expect(durationToTranslationKey("days", 3)).toEqual("day_plural");
    });

    test("it returns year_singular if value equals 1", () => {
      expect(durationToTranslationKey("years", 1)).toEqual("year_singular");
    });
  });
});
