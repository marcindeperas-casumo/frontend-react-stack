import React from "react";
import { shallow } from "enzyme";
import { DepositLimitsOverview } from "./DepositLimitsOverview";

const props = {
  currencySign: "£",
  t: {
    daily_short: "daily_short",
    weekly_short: "weekly_short",
    monthly_short: "monthly_short",
    deposit_limits: "deposit_limits",
    change_in_future: "change_in_future",
    remove_all: "remove_all",
    remaining_limit: "remaining_limit",
  },
  limits: {
    daily: 10,
    weekly: 30,
    monthly: 100,
  },
  pendingLimitChanges: {},
  limitsUsage: {
    daily: 0,
    weekly: 0,
    monthly: 0,
  },
  edit: () => {},
  add: () => {},
  removeAll: () => {},
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
          daily: 10,
        }}
      />
    );

    expect(rendered.find({ "data-test-id": "limit-daily" })).toHaveLength(1);
    expect(rendered.find({ "data-test-id": "limit-weekly" })).toHaveLength(0);
    expect(rendered.find({ "data-test-id": "limit-monthly" })).toHaveLength(0);
  });
});
