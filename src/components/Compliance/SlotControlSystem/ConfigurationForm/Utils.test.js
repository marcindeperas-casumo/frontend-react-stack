// @flow
import { isBudgetTooLow, isBudgetTooHigh, isBudgetInvalid } from "./Utils";

describe("Compliance/SlotControlSystem/ConfigurationForm/Utils", () => {
  describe("isBudgetTooLow()", () => {
    test("it returns true if budget is lower than 0.1", () => {
      expect(isBudgetTooLow({ budget: 0.05 })).toEqual(true);
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
      expect(isBudgetInvalid({ budget: 0.03, balance: 54 })).toEqual(true);
    });

    test("it returns true if budget is too high", () => {
      expect(isBudgetInvalid({ budget: 70, balance: 54 })).toEqual(true);
    });
  });
});
