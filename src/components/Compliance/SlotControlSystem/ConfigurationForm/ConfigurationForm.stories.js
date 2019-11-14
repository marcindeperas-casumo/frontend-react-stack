// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
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
  want_break_after_opts: [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ],
  for_how_long: "For how long?",
  play: "Play",
  minutes_abbreviated: "{{minutes}}m",
  hours_abbreviated: "{{hours}}h",
  days_abbreviated: "{{days}}d",
};

stories.add("Default", () => {
  return (
    <ConfigurationForm
      currency={select("Currency", ["EUR", "GBP"], "EUR")}
      locale="en-GB"
      balance={number("Balance", 100)}
      fetchContentIfNecessary={action("fetchContentIfNecessary")}
      createSession={action("createSession")}
      isCreatingSession={boolean("isCreatingSession", false)}
      t={t}
    />
  );
});
