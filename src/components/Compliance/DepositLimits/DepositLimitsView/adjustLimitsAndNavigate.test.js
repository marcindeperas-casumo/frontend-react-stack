// @flow
import { adjustLimitsAndNavigate } from "./adjustLimitsAndNavigate";

describe("adjustLimitsAndNavigate", () => {
  // adjustLimitsAndNavigate takes `limitAdjust` and `navigate` and calls what's needed
  test("delete/increase flow, APPROVAL_REQUIRED_FOR_INCREASE", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props = {
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
        previouslyIncreased: true,
        weekly: null,
      },
      rules: [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "APPROVAL_REQUIRED_FOR_INCREASE",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ],
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenNthCalledWith(1, props.newLimits);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["BEING_REVIEWED"],
      route: "confirmations",
    });
  });

  test("delete/increase flow, RESPONSIBLE_GAMBLING_TEST_REQUIRED", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props = {
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
        previouslyIncreased: true,
        weekly: null,
      },
      rules: [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ],
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
    const props = {
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
        previouslyIncreased: true,
        weekly: 1500,
      },
      rules: [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ],
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenCalledTimes(0);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["RG_REQUIRED"],
      route: "confirmations",
    });
  });

  test("decrease flow", () => {
    const limitAdjust = jest.fn();
    const navigate = jest.fn();
    const props = {
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
        previouslyIncreased: true,
        weekly: 1000,
      },
      rules: [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ],
    };

    adjustLimitsAndNavigate(props);

    expect(limitAdjust).toHaveBeenNthCalledWith(1, props.newLimits);
    expect(navigate).toHaveBeenNthCalledWith(1, {
      pages: ["SAVED_RIGHT_AWAY"],
      route: "confirmations",
    });
  });
});
