// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { TransactionsBetsHistoryYearSelector } from "./TransactionsBetsHistoryYearSelector";

const stories = storiesOf("TransactionsBetsHistoryYearSelector", module);

const props = {
  fetchYearOverview: () =>
    new Promise(resolve => {
      setTimeout(resolve, 3000);
    }),
};

stories.add("Default", () => {
  return <TransactionsBetsHistoryYearSelector {...props} />;
});
