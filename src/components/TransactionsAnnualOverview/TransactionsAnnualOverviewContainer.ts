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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedYear' does not exist on type '{}... Remove this comment to see the full error message
  (state, { selectedYear }) => ({
    locale: localeSelector(state),
    t: transactionsBetsHistoryContentSelector(state),
    data: annualOverviewSelector(selectedYear)(state),
    PdfButton: TransactionsAnnualOverviewPdfButton,
  }),
  () => ({
    navigateToHistory: () => navigateById({ routeId: "history" }),
  })
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ locale, t, data, navigateToHi... Remove this comment to see the full error message
)(TransactionsAnnualOverview);
