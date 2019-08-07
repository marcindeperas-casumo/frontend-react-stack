// @flow
import {
  getDepositLimitsSelector,
  getDepositLimitsHistorySelector,
  hasRule,
} from "./depositLimits.selectors";

describe("Models/playOkay/depositLimits/.selectors", () => {
  test("getDepositLimitsSelector", () => {
    expect(
      getDepositLimitsSelector({
        playOkay: {
          depositLimits: {
            everything: "everything",
            else: "else",
            will: "will",
            be: "returned",
            history: "won't be in returned value",
          },
        },
      })
    ).toEqual({
      everything: "everything",
      else: "else",
      will: "will",
      be: "returned",
    });
  });

  test("getDepositLimitsHistorySelector", () => {
    expect(
      getDepositLimitsHistorySelector({
        playOkay: {
          depositLimits: {
            history: "history goes here",
          },
        },
      })
    ).toEqual("history goes here");
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
