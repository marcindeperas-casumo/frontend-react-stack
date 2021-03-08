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
  test("should show error message if amount reaches deposit limit", () => {
    const props = {
      ...baseProps,
      ...createComplianceState(10000),
      amount: 10000,
    };

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ amount: number; DGAComplianceState: { depo... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ amount: number; DGAComplianceState: { depo... Remove this comment to see the full error message
    const component = mount(<SetAmount {...props} />);

    expect(component.find({ "data-test-id": "warning-message" }).exists()).toBe(
      false
    );
  });

  test("should always display TextInput component", () => {
    const props = {
      ...baseProps,
    };

    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ t: {}; locale: string; currency: string; c... Remove this comment to see the full error message
    const component = mount(<SetAmount {...props} />);

    expect(component.find(TextInput).exists()).toBe(true);
  });
});
