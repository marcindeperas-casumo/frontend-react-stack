import React from "react";
import { mount } from "enzyme";
import { TextInput } from "Components/Compliance/TextInput";
import { SetAmount } from "./SetAmount";

const baseProps = {
  t: {},
  locale: "da-DK",
  currency: "DKK",
  confirmLimit: () => {},
  setAmount: () => {},
  limitType: "Daily",
  loading: false,
};

const createComplianceState = depositLimit => ({
  DGAComplianceState: {
    depositLimit: depositLimit,
  },
});

describe("SetAmount", () => {
  test("should show error message if amount is higher than deposit limit", () => {
    const props = {
      ...baseProps,
      ...createComplianceState(10000),
      amount: 10000,
    };

    const component = mount(<SetAmount {...props} />);

    expect(component.find({ "data-test-id": "warning-message" }).exists()).toBe(
      true
    );
  });

  test("should not show error message if amount is lower than deposit limit", () => {
    const props = {
      ...baseProps,
      ...createComplianceState(10000),
      amount: 5000,
    };

    const component = mount(<SetAmount {...props} />);

    expect(component.find({ "data-test-id": "warning-message" }).exists()).toBe(
      false
    );
  });

  test("should always display TextInput component", () => {
    const props = {
      ...baseProps,
    };

    const component = mount(<SetAmount {...props} />);

    expect(component.find(TextInput).exists()).toBe(true);
  });
});
