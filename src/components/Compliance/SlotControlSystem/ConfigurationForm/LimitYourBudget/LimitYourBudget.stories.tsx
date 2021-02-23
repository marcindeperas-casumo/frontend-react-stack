// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, number } from "@storybook/addon-knobs/react";
import { LimitYourBudget } from "./LimitYourBudget";

const stories = storiesOf(
  "Compliance/SlotControlSystem/LimitYourBudget",
  module
);
const t = {
  limit_your_budget: "Limit your budget",
  use_all_balance: "Use all balance {{balance}}",
  error_budget_too_low: "{{budget}} is the minimum budget",
  error_budget_too_high: "Your balance allows up to {{balance}}",
};

stories.add("Default", () => {
  return (
    <LimitYourBudget
      currency={select("Currency", ["EUR", "GBP"], "EUR")}
      locale="en-GB"
      balance={number("Balance", 100)}
      onSubmit={action("onSubmit")}
      t={t}
    />
  );
});
