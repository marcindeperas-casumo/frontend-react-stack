// @flow
import { connect } from "react-redux";
import { range } from "ramda";
import DurandalReactBridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_CHANGE_ROUTE } from "Src/constants";
import { walletIdSelector } from "Models/handshake";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import {
  CMS_CONTENT_SLUG,
  transactionsBetsHistoryContentSelector,
  isAnnualOverviewFetchLoadingSelector,
  initFetchAnnualOverview,
  types,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverviewYearSelector } from "./TransactionsAnnualOverviewYearSelector";

const CURRENT_YEAR = new Date().getFullYear();
/**
 * Hardcoded for audit to 2018-2019.
 */
const AVAILABLE_YEARS = range(CURRENT_YEAR - 1, CURRENT_YEAR + 1);

export const TransactionsAnnualOverviewYearSelectorContainer = connect(
  state => ({
    walletId: walletIdSelector(state),
    yearOptions: AVAILABLE_YEARS,
    selectedYear: CURRENT_YEAR,
    content: transactionsBetsHistoryContentSelector(state),
    isContentFetched: isPageFetchedSelector(CMS_CONTENT_SLUG)(state),
    isAnnualOverviewLoading: year =>
      isAnnualOverviewFetchLoadingSelector(year)(state),
  }),
  (dispatch, ownProps) => ({
    fetchContent: () => dispatch(fetchPageBySlug(CMS_CONTENT_SLUG)),
    fetchYearOverview: year =>
      new Promise((resolve, reject) =>
        dispatch(
          initFetchAnnualOverview({
            year,
            meta: { resolve, reject },
          })
        )
      ).then(() =>
        // Need to pack it as a router model function and hide bridge dependency
        DurandalReactBridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
          routeId: "history-transactions-annual-overview",
          params: { year },
        })
      ),
  })
)(TransactionsAnnualOverviewYearSelector);
