// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const props = {
  t: {
    suspend_account: "Suspend account",
    add: "Add",
  },
  showOldSuspendAccountView: () => {},
};

describe("DepositLimitsSuspendAccount", () => {
  test("clicking triggers showOldSuspendAccountView", () => {
    const showOldSuspendAccountView = jest.fn();
    const rendered = shallow(
      <DepositLimitsSuspendAccount
        {...props}
        showOldSuspendAccountView={showOldSuspendAccountView}
      />
    );

    expect(showOldSuspendAccountView).toHaveBeenCalledTimes(0);
    rendered.find({ "data-test-id": "suspendAccountButton" }).simulate("click");
    expect(showOldSuspendAccountView).toHaveBeenCalledTimes(1);
  });
});
