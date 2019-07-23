// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, boolean, text } from "@storybook/addon-knobs/react";
import { TransactionsAnnualOverviewYearSelector } from "./TransactionsAnnualOverviewYearSelector";

const stories = storiesOf("TransactionsAnnualOverviewYearSelector", module);

const props = {
  selectorHtmlId: "year-selector-id",
  selectedYear: 2019,
  yearOptions: [2017, 2018, 2019],
  fetchYearOverview: () =>
    new Promise(resolve => {
      setTimeout(resolve, 3000);
    }),
  content: {
    annual_overview_year_selector_heading: "Annual Transactions Overview",
    annual_overview_year_selector_label: "Year",
    annual_overview_year_selector_button: "Show Annual Overview",
  },
  isContentFetched: true,
  fetchContent: () => {},
};

stories.add("Default", () => {
  return <TransactionsAnnualOverviewYearSelector {...props} />;
});
