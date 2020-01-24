// @flow
import { connect } from "react-redux";
import { navigateById } from "Services/NavigationService";
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
    navigateToHistory: () => navigateById({ routeId: "history" }),
  })
)(TransactionsAnnualOverview);
