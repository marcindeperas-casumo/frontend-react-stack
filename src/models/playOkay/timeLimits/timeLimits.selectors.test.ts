// @flow
import { prepareStateMock } from "Models/playOkay";
import {
  loginTimeLimitsSelector,
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  allLoginTimeLimitsDefinedSelector,
} from "./timeLimits.selectors";
import dailyLimitMock from "./__mocks__/dailyLimit";
import weeklyLimitMock from "./__mocks__/weeklyLimit";
import monthlyLimitMock from "./__mocks__/monthlyLimit";

describe("playOkay/timeLimits.selectors", () => {
  describe("loginTimeLimitsSelector()", () => {
    test("it returns empty list if state does not contain any time limits set", () => {
      const state = prepareStateMock({ loginTimeLimits: {} });

      expect(loginTimeLimitsSelector(state)).toEqual([]);
    });

    test("it returns list with a set time limit", () => {
      const state = prepareStateMock({ loginTimeLimits: { daily: true } });

      expect(loginTimeLimitsSelector(state)).toHaveLength(1);
    });
  });

  describe("dailyLoginTimeLimitSelector()", () => {
    test("it returns daily limit if defined", () => {
      const state = prepareStateMock({ loginTimeLimits: { daily: true } });

      expect(dailyLoginTimeLimitSelector(state)).toEqual(dailyLimitMock);
    });
  });

  describe("weeklyLoginTimeLimitSelector()", () => {
    test("it returns weekly limit if defined", () => {
      const state = prepareStateMock({
        loginTimeLimits: { daily: true, weekly: true },
      });

      expect(weeklyLoginTimeLimitSelector(state)).toEqual(weeklyLimitMock);
    });

    test("it returns nothing if weekly limit is undefined", () => {
      const state = prepareStateMock({ loginTimeLimits: { daily: true } });

      expect(weeklyLoginTimeLimitSelector(state)).toBeUndefined();
    });
  });

  describe("monthlyLoginTimeLimitSelector()", () => {
    test("it returns monthly limit if defined", () => {
      const state = prepareStateMock({
        loginTimeLimits: { daily: true, weekly: true, monthly: true },
      });

      expect(monthlyLoginTimeLimitSelector(state)).toEqual(monthlyLimitMock);
    });

    test("it returns nothing if monthly limit is undefined", () => {
      const state = prepareStateMock({ loginTimeLimits: { weekly: true } });

      expect(monthlyLoginTimeLimitSelector(state)).toBeUndefined();
    });
  });

  describe("allLoginTimeLimitsDefinedSelector()", () => {
    test("it returns true if all time limits are defined", () => {
      const state = prepareStateMock({
        loginTimeLimits: { daily: true, weekly: true, monthly: true },
      });

      expect(allLoginTimeLimitsDefinedSelector(state)).toEqual(true);
    });

    test("it returns false if only some time limits are defined", () => {
      const state = prepareStateMock({
        loginTimeLimits: { weekly: true, monthly: true },
      });

      expect(allLoginTimeLimitsDefinedSelector(state)).toEqual(false);
    });
  });
});
