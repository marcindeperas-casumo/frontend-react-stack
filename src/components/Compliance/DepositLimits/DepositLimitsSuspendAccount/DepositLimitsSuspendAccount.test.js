// @flow
import * as React from "react";
import { shallow, mount } from "enzyme";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const props = {
  t: {
    main_title: "Suspend account",
  },
  fetchTranslations: () => {},
  showOldSuspendAccountView: () => {},
};

describe("DepositLimitsSuspendAccount", () => {
  test("fetchTranslations is called on mount", () => {
    const fetchTranslations = jest.fn();
    mount(
      <DepositLimitsSuspendAccount
        {...props}
        fetchTranslations={fetchTranslations}
      />
    );

    expect(fetchTranslations).toHaveBeenCalledTimes(1);
  });

  test("clicking triggers showOldSuspendAccountView", () => {
    const showOldSuspendAccountView = jest.fn();
    const rendered = shallow(
      <DepositLimitsSuspendAccount
        {...props}
        showOldSuspendAccountView={showOldSuspendAccountView}
      />
    );

    expect(showOldSuspendAccountView).toHaveBeenCalledTimes(0);
    rendered.simulate("click");
    expect(showOldSuspendAccountView).toHaveBeenCalledTimes(1);
  });
});
