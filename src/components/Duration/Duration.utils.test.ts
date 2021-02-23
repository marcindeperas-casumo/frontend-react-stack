// @flow
import tMock from "./__mocks__/translations";
import {
  durationToTranslationKey,
  interpolateDurationObject,
} from "./Duration.utils";

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

  describe("interpolateDurationObject()", () => {
    const getDuration = durationProps => ({
      years: 2020,
      months: 11,
      days: 10,
      hours: 9,
      minutes: 5,
      seconds: 59,
      ...durationProps,
    });
    const separator = " ";

    test(`it returns full representation when passed: ${JSON.stringify(
      getDuration()
    )}`, () => {
      const duration = getDuration();
      const { years, months, days, hours, minutes, seconds } = duration;

      expect(
        interpolateDurationObject({
          t: tMock,
          separator,
          duration,
        })
      ).toEqual(
        `${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
      );
    });

    test(`it returns full representation with leading units that are zero omitted when passed: ${JSON.stringify(
      getDuration({ years: 0, minutes: 0 })
    )}`, () => {
      const duration = getDuration({ years: 0, minutes: 0 });
      const { months, days, hours, minutes, seconds } = duration;

      expect(
        interpolateDurationObject({
          t: tMock,
          separator,
          duration,
        })
      ).toEqual(
        `${months} months ${days} days ${hours} hours ${minutes} minute ${seconds} seconds`
      );
    });

    test(`it returns abbreviated representation with leading units that are zero omitted when passed ${JSON.stringify(
      getDuration({ years: 0, minutes: 0 })
    )} and preferAbbreviated`, () => {
      const duration = getDuration({ years: 0, minutes: 0 });
      const { months, days, hours, minutes, seconds } = duration;

      expect(
        interpolateDurationObject({
          t: tMock,
          separator,
          duration,
          preferAbbreviated: true,
        })
      ).toEqual(`${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`);
    });

    test(`it returns short representation with first two non-zero units when passed ${JSON.stringify(
      getDuration({ years: 0, months: 0 })
    )} and preferShort`, () => {
      const duration = getDuration({ years: 0, months: 0 });
      const { days, hours } = duration;

      expect(
        interpolateDurationObject({
          t: tMock,
          separator,
          duration,
          preferShort: true,
        })
      ).toEqual(`${days} days ${hours} hours`);
    });

    test(`it returns abbreviated short representation with first two non-zero units when passed ${JSON.stringify(
      getDuration({ years: 0, months: 0, days: 0 })
    )} and preferShort and preferAbbreviated`, () => {
      const duration = getDuration({ years: 0, months: 0, days: 0 });
      const { hours, minutes } = duration;

      expect(
        interpolateDurationObject({
          t: tMock,
          separator,
          duration,
          preferShort: true,
          preferAbbreviated: true,
        })
      ).toEqual(`${hours}h ${minutes}m`);
    });
  });
});
