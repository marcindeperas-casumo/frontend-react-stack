// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { DepositLimitsOverview } from "./DepositLimitsOverview";
import t from "./__mocks__/cms";

const props = {
  t,
  locale: "en-GB",
  currency: "EUR",
  limits: {
    daily: 10,
    weekly: 30,
    monthly: 100,
    currency: "EUR",
  },
  remainingLimitValue: {
    daily: 0,
    weekly: 0,
    monthly: 0,
  },
  hideRemoveAll: false,
  edit: () => {},
  add: () => {},
  removeAll: () => {},
  limitCancel: () => {},
};
describe("DepositLimitsOverview", () => {
  test("has daily, weekly, monthly limits that can be edited", () => {
    const edit = jest.fn();
    const rendered = shallow(<DepositLimitsOverview {...props} edit={edit} />);

    ["daily", "weekly", "monthly"].forEach(limit => {
      rendered.find({ "data-test-id": `limit-${limit}` }).simulate("click");
      expect(edit).toHaveBeenCalledWith(limit);
    });
  });

  test("has doesn't render limits that are not set", () => {
    const rendered = shallow(
      <DepositLimitsOverview
        {...props}
        limits={{
          currency: "EUR",
          daily: 10,
          weekly: null,
          monthly: null,
        }}
      />
    );

    expect(rendered.find({ "data-test-id": "limit-daily" })).toHaveLength(1);
    expect(rendered.find({ "data-test-id": "limit-weekly" })).toHaveLength(0);
    expect(rendered.find({ "data-test-id": "limit-monthly" })).toHaveLength(0);
  });

  test("can cancel pending limit changes", () => {
    const limitCancel = jest.fn();
    const rendered = shallow(
      <DepositLimitsOverview
        {...props}
        limitCancel={limitCancel}
        pendingLimitChanges={{
          approvalRequired: false,
          confirmationRequired: false,
          effectiveFrom: "2012-12-12T12:12:12Z",
          reviewerApproved: false,
          value: { monthly: 666 },
        }}
      />
    );

    expect(limitCancel).toHaveBeenCalledTimes(0);
    rendered
      .find({ "data-test-id": "cancel-pending-limit-change" })
      .simulate("click");
    expect(limitCancel).toHaveBeenCalledTimes(1);
  });
});
