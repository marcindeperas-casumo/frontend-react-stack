// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { TransactionsBetsHistoryAnnualOverview } from "./TransactionsBetsHistoryAnnualOverview";

const stories = storiesOf("TransactionsBetsHistoryAnnualOverview", module);
const props = {
  content: {
    annual_transactions_list_heading: "Heading",
    annual_transactions_starting_balance: "Starting Balance",
    annual_transactions_total_deposits: "Total Deposits",
  },
};

const Stories = () => <TransactionsBetsHistoryAnnualOverview {...props} />;

if (isNotChromatic) {
  stories.add("TransactionsBetsHistoryAnnualOverview", Stories);
}
