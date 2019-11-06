// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { DepositLimitsOverview } from "./DepositLimitsOverview";
import t from "./__mocks__/cms";

const props = {
  t,
  locale: "en-GB",
  currency: "EUR",
  limits: [
    {
      limitKind: "daily",
      value: 10,
      remaining: 0,
    },
    {
      limitKind: "weekly",
      value: 30,
      remaining: 0,
    },
    {
      limitKind: "monthly",
      value: 100,
      remaining: 0,
    },
  ],
  pendingChanges: [],
  canIncreaseLimits: true,
  allRemoved: false,
  edit: () => {},
  add: () => {},
  removeAll: () => {},
  limitCancel: () => {},
  showOldSuspendAccountView: () => {},
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
        limits={[
          {
            limitKind: "daily",
            value: 10,
            remaining: 0,
          },
        ]}
      />
    );

    expect(rendered.find({ "data-test-id": "limit-daily" })).toHaveLength(1);
    expect(rendered.find({ "data-test-id": "limit-weekly" })).toHaveLength(0);
    expect(rendered.find({ "data-test-id": "limit-monthly" })).toHaveLength(0);
  });
});
