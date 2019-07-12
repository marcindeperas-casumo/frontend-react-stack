// @flow
import React from "react";
import { connect } from "react-redux";
import { pick } from "ramda";
import { currencySelector, localeSelector } from "Models/handshake";
import { transactionsBetsHistoryAnnualOverviewSelector } from "Models/transactionsBetsHistory";
import { TransactionsBetsHistoryAnnualOverview } from "./TransactionsBetsHistoryAnnualOverview";

export const TransactionsBetsHistoryAnnualOverviewContainer = connect(
  (state, { selectedYear }) => {
    return {
      locale: localeSelector(state),
      currency: currencySelector(state),
      content: {}, // this is cooking in another PR: https://github.com/Casumo/frontend-react-stack/pull/561
      data: transactionsBetsHistoryAnnualOverviewSelector(selectedYear)(state),
    };
  }
)(TransactionsBetsHistoryAnnualOverview);
