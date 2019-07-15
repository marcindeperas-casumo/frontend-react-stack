// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DepositLimitsOverview } from "./DepositLimitsOverview";

const stories = storiesOf("DepositLimitsOverview", module);

const t = {
  daily_short: "Daily",
  weekly_short: "Weekly",
  monthly_short: "Monthly",
  deposit_limits: "Deposit limits",
  change_in_future: "Becomes {newLimitValue} on {limitChangeDate}",
  remove_all: "Remove All",
  remaining_limit: "{value} remaining",
};
stories.add("Default", () => (
  <DepositLimitsOverview
    currencySign="€"
    t={t}
    limits={{
      daily: 600,
      weekly: 1500,
      monthly: 3000,
      currency: "EUR",
      previouslyIncreased: false,
    }}
    pendingLimitChanges={{
      daily: { date: Date.now() + 48 * 60 * 60 * 100, value: 750 },
    }}
    limitsUsage={{
      daily: 1,
      weekly: 80,
      monthly: 33,
    }}
    edit={() => {}}
    add={() => {}}
    removeAll={() => {}}
  />
));

stories.add("No limits", () => (
  <DepositLimitsOverview
    currencySign="€"
    t={t}
    limits={{
      daily: null,
      weekly: null,
      monthly: null,
      currency: "EUR",
      previouslyIncreased: false,
    }}
    pendingLimitChanges={{}}
    edit={() => {}}
    add={() => {}}
    removeAll={() => {}}
  />
));
