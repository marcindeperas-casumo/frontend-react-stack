// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { DepositLimitsOverview } from "./DepositLimitsOverview";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/DepositLimitsOverview", module);

const actions = {
  add: action("add clicked"),
  edit: action("edit clicked"),
  limitCancel: action("limitCancel clicked"),
  removeAll: action("removeAll clicked"),
  showOldSuspendAccountView: action("showOldSuspendAccountView clicked"),
};

stories.add("Default", () => (
  <MockStore>
    <DepositLimitsOverview
      locale="en-GB"
      currency="EUR"
      canIncreaseLimits={false}
      allRemoved={false}
      t={t}
      limits={[
        {
          limitKind: "daily",
          value: 600,
          remaining: 30,
        },
        {
          limitKind: "weekly",
          value: 1500,
          remaining: 400,
        },
        {
          limitKind: "monthly",
          value: 3000,
          remaining: 800,
        },
      ]}
      pendingChanges={[
        {
          limitKind: "daily",
          value: 750,
        },
      ]}
      {...actions}
    />
  </MockStore>
));

stories.add("No limits", () => (
  <MockStore>
    <DepositLimitsOverview
      locale="en-GB"
      currency="EUR"
      allRemoved={false}
      canIncreaseLimits={true}
      t={t}
      limits={[]}
      pendingChanges={[]}
      {...actions}
    />
  </MockStore>
));

stories.add("Removing all", () => (
  <MockStore>
    <DepositLimitsOverview
      locale="en-GB"
      currency="EUR"
      t={t}
      allRemoved
      canIncreaseLimits={false}
      limits={[
        {
          limitKind: "daily",
          value: 600,
          remaining: 30,
        },
        {
          limitKind: "weekly",
          value: 1500,
          remaining: 400,
        },
        {
          limitKind: "monthly",
          value: 3000,
          remaining: 800,
        },
      ]}
      pendingChanges={[
        {
          limitKind: "daily",
          value: null,
        },
        {
          limitKind: "weekly",
          value: null,
        },
        {
          limitKind: "monthly",
          value: null,
        },
      ]}
      {...actions}
    />
  </MockStore>
));
