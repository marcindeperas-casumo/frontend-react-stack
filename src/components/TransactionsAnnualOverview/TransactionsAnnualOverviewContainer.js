// @flow
import { connect } from "react-redux";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { localeSelector } from "Models/handshake";
import {
  transactionsBetsHistoryContentSelector,
  annualOverviewSelector,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverviewPdfButton } from "Components/PdfButton";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";

export const TransactionsAnnualOverviewContainer = connect(
  (state, { selectedYear }) => ({
    locale: localeSelector(state),
    t: transactionsBetsHistoryContentSelector(state),
    data: annualOverviewSelector(selectedYear)(state),
    PdfButton: TransactionsAnnualOverviewPdfButton,
  }),
  () => ({
    // Need to pack it as a router model function and hide bridge dependency
    navigateToHistory: () =>
      DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
        routeId: "history",
      }),
  })
)(TransactionsAnnualOverview);
