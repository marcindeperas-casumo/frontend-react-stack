// @flow
import React from "react";
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { currencySelector, localeSelector } from "Models/handshake";
import {
  transactionsBetsHistoryContentSelector,
  transactionsBetsHistoryAnnualOverviewSelector,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";

export const TransactionsAnnualOverviewContainer = connect(
  (state, { selectedYear }) => ({
    locale: localeSelector(state),
    currency: currencySelector(state),
    content: transactionsBetsHistoryContentSelector(state),
    data: transactionsBetsHistoryAnnualOverviewSelector(selectedYear)(state),
  }),
  () => ({
    navigateToHistory: () =>
      DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
        routeId: "history",
      }),
  })
)(TransactionsAnnualOverview);
