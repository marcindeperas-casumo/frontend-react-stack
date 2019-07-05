// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { TransactionsBetsHistoryYearSelector } from "./TransactionsBetsHistoryYearSelector";

const stories = storiesOf("TransactionsBetsHistoryYearSelector", module);

const props = {
  selectedYear: 2019,
  yearOptions: [2017, 2018, 2019],
  fetchYearOverview: () =>
    new Promise(resolve => {
      setTimeout(resolve, 3000);
    }),
  content: {
    year_selector_heading: "Annual Transactions Overview",
  },
  isContentFetched: true,
  fetchContent: () => Promise.resolve(),
};

stories.add("Default", () => {
  return <TransactionsBetsHistoryYearSelector {...props} />;
});
