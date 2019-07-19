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
    annual_transactions_total_withdrawals: "Total Withdrawals",
    annual_transactions_total_wagers: "Total Wagers",
    annual_transactions_total_wins: "Total Wins",
    annual_transactions_total_bonus_awarded: "Total Bonus Awarded",
    annual_transactions_total_bonus_converted: "Total Bonus Converted",
    annual_transactions_end_balance: "End Balance",
    annual_transactions_download_pdf: "Download PDF",
  },
  data: {
    betsAmount: 34.6,
    depositsAmount: 12.4,
    withdrawalsAmount: 55.5,
    winningsAmount: 34.5,
    awardedBonusesAmount: 11.2,
    convertedBonusesAmount: 2,
    currency: "GBP",
  },
  currency: "GBP",
  locale: "en-GB",
  navigateToHistory: () => {},
};

const Stories = () => <TransactionsBetsHistoryAnnualOverview {...props} />;

if (isNotChromatic) {
  stories.add("TransactionsBetsHistoryAnnualOverview", Stories);
}
