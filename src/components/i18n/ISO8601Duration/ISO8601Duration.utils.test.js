// @flow
import {
  convertSecondsToISO8601Duration,
  durationToTranslationKey,
} from "./ISO8601Duration.utils";

const HOUR = 60 * 60;
const DAY = 24 * HOUR;

describe("Components/i18n/ISO8601Duration.utils", () => {
  describe("convertSecondsToISO8601Duration()", () => {
    test("should show milliseconds if withMillis is passed", () => {
      expect(
        convertSecondsToISO8601Duration(2.034, { withMillis: true })
      ).toEqual("PT2.034S");
    });

    test("should not show milliseconds if withMillis is not passed", () => {
      expect(convertSecondsToISO8601Duration(2.034)).toEqual("PT2S");
    });

    describe("isShort option", () => {
      test("should show days and hours if passed value is at least one day", () => {
        expect(
          convertSecondsToISO8601Duration(DAY + 2 * HOUR + 67, {
            isShort: true,
          })
        ).toEqual("P1DT2H");
      });

      test("should show hours and minutes if passed value is at least one hour but less than one day", () => {
        expect(
          convertSecondsToISO8601Duration(6 * HOUR + 34 * 60 + 4, {
            isShort: true,
          })
        ).toEqual("PT6H34M");
      });

      test("should show minutes and seconds if passed value is at least one minute but less than one hour", () => {
        expect(
          convertSecondsToISO8601Duration(21 * 60 + 4, { isShort: true })
        ).toEqual("PT21M4S");
      });

      test("should show seconds if passed value is less than one minute", () => {
        expect(convertSecondsToISO8601Duration(7, { isShort: true })).toEqual(
          "PT7S"
        );
      });
    });

    describe("without isShort option", () => {
      test("should show days, hours, minutes and seconds if passed value is at least one day", () => {
        expect(convertSecondsToISO8601Duration(DAY + 2 * HOUR + 67)).toEqual(
          "P1DT2H1M7S"
        );
      });

      test("should show hours, minutes and seconds if passed value is at least one hour but less than one day", () => {
        expect(convertSecondsToISO8601Duration(6 * HOUR + 34 * 60 + 4)).toEqual(
          "PT6H34M4S"
        );
      });

      test("should show minutes and seconds if passed value is at least one minute but less than one hour", () => {
        expect(convertSecondsToISO8601Duration(21 * 60 + 4)).toEqual("PT21M4S");
      });

      test("should show seconds if passed value is less than one minute", () => {
        expect(convertSecondsToISO8601Duration(7)).toEqual("PT7S");
      });
    });
  });

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
