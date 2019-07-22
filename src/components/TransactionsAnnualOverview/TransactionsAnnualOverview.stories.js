// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import annualOverviewMock from "Models/transactionsBetsHistory/__mocks__/annualOverview.json";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";
import cmsMocks from "./__mocks__/cms.json";

const stories = storiesOf("TransactionsAnnualOverview", module);
const props = {
  t: cmsMocks,
  data: annualOverviewMock,
  locale: "en-GB",
  navigateToHistory: () => {},
};

const Stories = () => <TransactionsAnnualOverview {...props} />;

stories.add("TransactionsAnnualOverview", Stories);
