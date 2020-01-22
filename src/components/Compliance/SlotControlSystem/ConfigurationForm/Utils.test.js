// @flow
import {
  isBudgetTooLow,
  isBudgetTooHigh,
  isBudgetInvalid,
  transformFormDataToRequestPayload,
} from "./Utils";

describe("Compliance/SlotControlSystem/ConfigurationForm/Utils", () => {
  describe("isBudgetTooLow()", () => {
    test("it returns true if budget is lower than 0", () => {
      expect(isBudgetTooLow({ budget: -0.1 })).toEqual(true);
    });
  });

  describe("isBudgetTooHigh()", () => {
    test("it returns true if budget is higher than balance", () => {
      expect(isBudgetTooHigh({ budget: 23, balance: 22 })).toEqual(true);
    });
  });

  describe("isBudgetInvalid()", () => {
    test("it returns true if budget is NaN", () => {
      expect(isBudgetInvalid({ budget: NaN, balance: 54 })).toEqual(true);
    });

    test("it returns true if budget is too low", () => {
      expect(isBudgetInvalid({ budget: -0.03, balance: 54 })).toEqual(true);
    });

    test("it returns true if budget is too high", () => {
      expect(isBudgetInvalid({ budget: 70, balance: 54 })).toEqual(true);
    });
  });

  describe("transformFormDataToRequestPayload()", () => {
    const currency = "EUR";
    const budget = 111;
    const time = 333333333;
    const alertsEvery = 60 * 5;
    const breakAfter = 60 * 60;

    test("it transforms argument object into valid payload", () => {
      expect(
        transformFormDataToRequestPayload({
          currency,
          budget,
          time,
          alertsEvery,
          breakAfter,
        })
      ).toEqual({
        limit: {
          currency,
          amount: budget,
        },
        durationInSecs: time,
        reminderFrequencyInSecs: alertsEvery,
        postSessionExclusionInMinutes: breakAfter / 60,
      });
    });

    test("it does not include postSessionExclusionInMinutes in payload if no defined break", () => {
      expect(
        transformFormDataToRequestPayload({
          currency,
          budget,
          time,
          alertsEvery,
        })
      ).toEqual({
        limit: {
          currency,
          amount: budget,
        },
        durationInSecs: time,
        reminderFrequencyInSecs: alertsEvery,
      });
    });
  });
});
