// @flow
import {
  moneyLimitsSelector,
  depositLimitHasBeenSetSelector,
  depositLimitSelector,
} from "./playOkay.selectors";

const playOkayMockWithDepositLimit = {
  moneyLimits: [{ limitType: "DepositLimit" }],
  isDepositLimitProperlySet: true,
};

const playOkayMockWithoutDepositLimit = {
  moneyLimits: [{ limitType: "WagerLimit" }],
  isDepositLimitProperlySet: false,
};

const createMockWithData = data => {
  return {
    playOkay: {
      playOkay: data,
    },
  };
};

describe("Denmark compliance playOkay selectors", () => {
  describe("moneyLimitSelector()", () => {
    test("should return moneyLimits prop from given state", () => {
      const mockState = createMockWithData(playOkayMockWithDepositLimit);

      expect(moneyLimitsSelector(mockState)).toEqual(
        playOkayMockWithDepositLimit.moneyLimits
      );
    });

    test("should return [] when there is no moneyLimits in the state", () => {
      const mockState = createMockWithData({});

      expect(moneyLimitsSelector(mockState)).toEqual([]);
    });
  });

  describe("depositLimitHasBeenSetSelector()", () => {
    test("should return proper boolean value, the same which is in the state", () => {
      const mockState = createMockWithData(playOkayMockWithDepositLimit);

      expect(depositLimitHasBeenSetSelector(mockState)).toEqual(
        playOkayMockWithDepositLimit.isDepositLimitProperlySet
      );
    });
  });

  describe("depositLimitSelector()", () => {
    test("should return any deposit limit from playOkay money limits list", () => {
      const mockState = createMockWithData(playOkayMockWithDepositLimit);

      expect(depositLimitSelector(mockState)).toEqual(
        playOkayMockWithDepositLimit.moneyLimits[0]
      );
    });

    test("should return undefined if there is no deposit limit on the list of money limits", () => {
      const mockState = createMockWithData(playOkayMockWithoutDepositLimit);

      expect(depositLimitSelector(mockState)).toBeUndefined();
    });
  });
});
