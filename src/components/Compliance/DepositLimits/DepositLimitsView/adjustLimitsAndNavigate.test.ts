import type { DepositLimitPreadjustRules } from "Models/playOkay/depositLimits";
import { adjustLimitsAndNavigate } from "./adjustLimitsAndNavigate";
import type { TAdjustLimitsAndNavigateProps } from "./adjustLimitsAndNavigate";

describe("adjustLimitsAndNavigate", () => {
  // these flags are now always true
  const rules = [
    "APPROVAL_REQUIRED_FOR_INCREASE",
    "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
    "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
    "DECREASE_EFFECTIVE_IMMEDIATELY",
  ] as DepositLimitPreadjustRules[];
  // adjustLimitsAndNavigate takes `limitAdjust` and `navigate` and calls what's needed
  test("delete/increase flow", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props: TAdjustLimitsAndNavigateProps = {
      limitAdjust,
      navigate,
      decreases: [],
      limitsDiff: {
        daily: "removed",
        monthly: "removed",
        weekly: "removed",
      },
      newLimits: {
        currency: "EUR",
        daily: null,
        monthly: null,
        weekly: null,
      },
      rules,
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["RG_REQUIRED"],
      route: "confirmations",
    });
  });

  test("increase/decrease flow, RESPONSIBLE_GAMBLING_TEST_REQUIRED", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props: TAdjustLimitsAndNavigateProps = {
      limitAdjust,
      navigate,
      decreases: ["daily"],
      limitsDiff: {
        daily: "decrease",
        monthly: "increase",
        weekly: "unchanged",
      },
      newLimits: {
        currency: "EUR",
        daily: 600,
        monthly: 3333,
        weekly: 1500,
      },
      rules,
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["SAVED_RIGHT_AWAY", "RG_REQUIRED"],
      route: "confirmations",
    });
  });

  test("decrease flow", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props: TAdjustLimitsAndNavigateProps = {
      limitAdjust,
      navigate,
      decreases: ["daily", "weekly"],
      limitsDiff: {
        daily: "decrease",
        monthly: "decrease",
        weekly: "decrease",
      },
      newLimits: {
        currency: "EUR",
        daily: 600,
        monthly: 3000,
        weekly: 1000,
      },
      rules,
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenNthCalledWith(1, props.newLimits);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["SAVED_RIGHT_AWAY"],
      route: "confirmations",
    });
  });
});
