// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { TransactionsAnnualYearSelector } from "./TransactionsAnnualYearSelector";

const stories = storiesOf("TransactionsAnnualYearSelector", module);

stories.add("Default", () => {
  return <TransactionsAnnualYearSelector />;
});
