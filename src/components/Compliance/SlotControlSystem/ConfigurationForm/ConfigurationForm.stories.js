// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, number } from "@storybook/addon-knobs/react";
import { ConfigurationForm } from "./ConfigurationForm";

const stories = storiesOf("SlotControlSystem/ConfigurationForm", module);
const t = {
  limit_your_budget: "Limit your budget",
  use_all_balance: "Use all balance {{balance}}",
  error_budget_too_low: "{{budget}} is the minimum budget",
  error_budget_too_high: "Your balance allows up to {{balance}}",
  limit_your_time: "Limit your time",
  get_status_alerts: "Get status alerts every",
  want_break_after: "Want a break after playing?",
  for_how_long: "For how long?",
  play: "Play",
};

stories.add("Default", () => {
  return (
    <ConfigurationForm
      currency={select("Currency", ["EUR", "GBP"], "EUR")}
      locale="en-GB"
      balance={number("Balance", 100)}
      t={t}
    />
  );
});
