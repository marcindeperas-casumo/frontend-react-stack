// @flow
import React from "react";
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { localeSelector } from "Models/handshake";
import {
  transactionsBetsHistoryContentSelector,
  transactionsBetsHistoryAnnualOverviewSelector,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";

export const TransactionsAnnualOverviewContainer = connect(
  (state, { selectedYear }) => ({
    locale: localeSelector(state),
    t: transactionsBetsHistoryContentSelector(state),
    data: transactionsBetsHistoryAnnualOverviewSelector(selectedYear)(state),
  }),
  () => ({
    // Need to pack it as a router model function and hide bridge dependency
    navigateToHistory: () =>
      DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
        routeId: "history",
      }),
  })
)(TransactionsAnnualOverview);
