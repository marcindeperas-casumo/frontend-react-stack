import * as React from "react";
import { mount } from "enzyme";
import type { DepositLimitPreadjustRules } from "Models/playOkay/dgojDepositLimits";
import { AdditionalConditions } from "./AdditionalConditions";
import preadjust from "./__mocks__/preadjust";

const props = {
  ...preadjust,
  t: {
    responsible_gambling_test_required: "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
    approval_required_for_increase: "APPROVAL_REQUIRED_FOR_INCREASE",
    approval_required_for_subsequent_increases:
      "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
    decrease_effective_immediately: "DECREASE_EFFECTIVE_IMMEDIATELY",
    cancellation_allowed: "CANCELLATION_ALLOWED",
  },
};
describe("AdditionalConditions", () => {
  test("Only aplicable rules are getting added to text", () => {
    const rules = [
      "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
      "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
      "DECREASE_EFFECTIVE_IMMEDIATELY",
      "CANCELLATION_ALLOWED",
    ] as DepositLimitPreadjustRules[];
    const text = mount(
      <AdditionalConditions {...props} rules={rules} />
    ).text();

    expect(text).toBe(rules.join(" "));
  });
});
