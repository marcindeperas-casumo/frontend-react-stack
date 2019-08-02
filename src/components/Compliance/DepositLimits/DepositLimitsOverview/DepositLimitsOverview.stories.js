// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsOverview } from "./DepositLimitsOverview";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimitsOverview", module);

const actions = {
  add: action("add clicked"),
  edit: action("edit clicked"),
  limitCancel: action("limitCancel clicked"),
  removeAll: action("removeAll clicked"),
};

stories.add("Default", () => (
  <DepositLimitsOverview
    locale="en-GB"
    t={t}
    limits={{
      daily: 600,
      weekly: 1500,
      monthly: 3000,
      currency: "EUR",
    }}
    pendingLimitChanges={{
      effectiveFrom: "2012-12-12T12:12:12Z",
      value: {
        daily: 750,
      },
      approvalRequired: false,
      confirmationRequired: false,
      reviewerApproved: false,
    }}
    remainingLimitValue={{
      daily: 30,
      weekly: 400,
      monthly: 800,
    }}
    {...actions}
  />
));

stories.add("No limits", () => (
  <DepositLimitsOverview
    locale="en-GB"
    t={t}
    limits={{
      daily: null,
      weekly: null,
      monthly: null,
      currency: "EUR",
    }}
    remainingLimitValue={{
      daily: null,
      weekly: null,
      monthly: null,
    }}
    {...actions}
  />
));
