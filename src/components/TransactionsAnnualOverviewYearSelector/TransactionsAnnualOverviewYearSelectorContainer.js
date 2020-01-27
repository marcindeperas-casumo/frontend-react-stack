// @flow
import { connect } from "react-redux";
import { range } from "ramda";
import { navigateById } from "Services/NavigationService";
import logger from "Services/logger";
import { walletIdSelector } from "Models/handshake";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import {
  CMS_CONTENT_SLUG,
  transactionsBetsHistoryContentSelector,
  isAnnualOverviewFetchingSelector,
  initFetchAnnualOverview,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverviewYearSelector } from "./TransactionsAnnualOverviewYearSelector";

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = range(CURRENT_YEAR - 1, CURRENT_YEAR + 1);

export const TransactionsAnnualOverviewYearSelectorContainer = connect(
  state => ({
    walletId: walletIdSelector(state),
    yearOptions: AVAILABLE_YEARS,
    selectedYear: CURRENT_YEAR,
    content: transactionsBetsHistoryContentSelector(state),
    isContentFetched: isPageFetchedSelector(CMS_CONTENT_SLUG)(state),
    isAnnualOverviewLoading: year =>
      isAnnualOverviewFetchingSelector(year)(state),
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
      )
        .catch(e => logger.error(`Silenced error: ${e}`))
        .then(() =>
          navigateById({
            routeId: "history-transactions-annual-overview",
            params: { year },
          })
        ),
  })
)(TransactionsAnnualOverviewYearSelector);
