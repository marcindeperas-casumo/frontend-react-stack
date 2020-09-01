// @flow
import React from "react";
import { mount, shallow } from "enzyme";
import { QuickDepositSlip } from "./QuickDepositSlip";
import { translations as t } from "./__mocks__/cms";

const props = {
  t: t,
  currencySymbol: "$",
  minAmount: 20,
  maxAmount: 100,
  onDeposit: () => {},
};

describe("<QuickDepositSlip />", () => {
  describe("validation", () => {
    let rendered;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);

    beforeEach(() => {
      // $FlowFixMe
      rendered = mount(shallow(<QuickDepositSlip {...props} />).get(0));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should show error for minimum amount", () => {
      const depositAmountSelector = rendered.find(
        "[data-test-id='deposit-amount-selector']"
      );

      const inputSelector = depositAmountSelector.find("input").at(0);
      inputSelector.instance().value = 5;
      inputSelector.simulate("change");
      expect(setState).toHaveBeenCalledWith(5);

      const helperTextSelector = depositAmountSelector.find("span").last();

      expect(helperTextSelector.text()).toBe(
        `Minimum deposit amount is ${props.currencySymbol}${props.minAmount}`
      );
    });

    test("should show error for maximum amount", () => {});

    test("should not allow submit when one or more errors occured", () => {});
  });
});
