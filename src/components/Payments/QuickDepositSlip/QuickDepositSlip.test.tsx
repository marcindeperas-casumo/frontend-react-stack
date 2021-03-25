import React from "react";
import { useDispatch } from "react-redux";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { QuickDepositSlip } from "./QuickDepositSlip";
import type { QuickDepositSlipProps } from "./QuickDepositSlip.types";
import { translations } from "./__mocks__/cms";

jest.mock("react-redux", () => {
  const { Provider, useSelector } = jest.requireActual("react-redux");

  return {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    useDispatch: jest.fn().mockReturnValue(),
    useSelector,
    Provider,
  };
});

const props: QuickDepositSlipProps = {
  translations,
  currencySymbol: "$",
  minAmount: 20,
  requestStatus: {
    state: "NONE",
  },
  maxAmount: 100,
  onDeposit: () => {},
  renderPaymentMethodDetails: () => <div>placeholder</div>,
};

const DATA_TEST_ID = "deposit-amount-selector";

describe("<QuickDepositSlip />", () => {
  describe("validation", () => {
    let rendered;
    let depositAmountSelector;
    let input;
    let dispatchMock;

    beforeEach(() => {
      dispatchMock = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
      rendered = mount(<QuickDepositSlip {...props} />);
      depositAmountSelector = rendered.find(`[data-test-id='${DATA_TEST_ID}']`);
      input = depositAmountSelector.find("input").at(0);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should show error messages for minimum amount", () => {
      act(() => {
        input.instance().value = 5;
        input.simulate("change");
        rendered.update();
      });

      const helperTextSelector = depositAmountSelector.find("span").last();

      expect(helperTextSelector.text()).toBe(
        `Minimum deposit amount is ${props.minAmount}`
      );
    });

    test("should show error message for maximum amount", () => {
      act(() => {
        input.instance().value = 101;
        input.simulate("change");
        rendered.update();
      });

      const helperTextSelector = depositAmountSelector.find("span").last();

      expect(helperTextSelector.text()).toBe(
        `Maximum deposit amount is ${props.maxAmount}`
      );
    });
  });
});
