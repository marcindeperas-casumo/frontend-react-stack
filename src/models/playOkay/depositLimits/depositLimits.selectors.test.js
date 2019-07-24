// @flow
import { getDepositLimitsSelector } from "./depositLimits.selectors";

describe("Models/playOkay/depositLimits/.selectors", () => {
  test("getDepositLimitsSelector", () => {
    expect(
      getDepositLimitsSelector({
        playOkay: {
          depositLimits: "object is here",
        },
      })
    ).toEqual("object is here");
  });
});
