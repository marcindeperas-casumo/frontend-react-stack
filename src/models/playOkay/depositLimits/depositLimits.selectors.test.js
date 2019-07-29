// @flow
import { getDepositLimitsSelector, hasRule } from "./depositLimits.selectors";

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

  test("hasRule", () => {
    expect(
      hasRule("REVOCATION_ALLOWED", [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "APPROVAL_REQUIRED_FOR_INCREASE",
        "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ])
    ).toEqual(true);
    expect(hasRule("REVOCATION_ALLOWED", ["REVOCATION_ALLOWED"])).toEqual(true);
    expect(
      hasRule("REVOCATION_ALLOWED", ["APPROVAL_REQUIRED_FOR_INCREASE"])
    ).toEqual(false);
  });
});
