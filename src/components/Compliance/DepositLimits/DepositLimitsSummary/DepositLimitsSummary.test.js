// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { DepositLimitsSummary } from "./DepositLimitsSummary";
import t from "./__mocks__/cms";
import preadjust from "./__mocks__/preadjust";

const props = {
  locale: "en-GB",
  t,
  preadjust,
  newLimits: {
    daily: 600,
    weekly: 1212,
    monthly: 3333,
    currency: "EUR",
  },
  currentLimits: {
    daily: 600,
    weekly: 1500,
    monthly: 3000,
    currency: "EUR",
  },
  edit: () => {},
  confirmLimitsAdjust: () => {},
  fetchTranslations: () => {},
};

describe("DepositLimitsSummary", () => {
  test("daily, weekly, monthly limits can be edited", () => {
    const edit = jest.fn();
    const rendered = shallow(<DepositLimitsSummary {...props} edit={edit} />);

    ["daily", "weekly", "monthly"].forEach(limit => {
      rendered.find({ "data-test-id": `limit-${limit}` }).simulate("click");
      expect(edit).toHaveBeenCalledWith(limit);
    });
  });

  test("", () => {
    const confirmLimitsAdjust = jest.fn();
    const rendered = shallow(
      <DepositLimitsSummary
        {...props}
        confirmLimitsAdjust={confirmLimitsAdjust}
      />
    );
    rendered.find({ "data-test-id": "submit-button" }).simulate("click");

    expect(confirmLimitsAdjust).toHaveBeenCalledTimes(1);
  });
});
