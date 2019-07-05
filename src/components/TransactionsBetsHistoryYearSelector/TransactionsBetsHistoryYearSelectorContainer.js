// @flow
import { connect } from "react-redux";
import { range } from "ramda";
import { DateTime } from "luxon";
import { walletIdSelector } from "Models/handshake";
import { getTotalsReq } from "Api/api.transactionsBetsHistory";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import {
  CMS_CONTENT_SLUG,
  transactionsBetsHistoryContentSelector,
} from "Models/transactionsBetsHistory";
import { TransactionsBetsHistoryYearSelector } from "./TransactionsBetsHistoryYearSelector";

const CURRENT_YEAR = new Date().getFullYear();
/**
 * Start from 2019. This will probably be moved to a service.
 */
const AVAILABLE_YEARS = range(2019, CURRENT_YEAR + 1);

export const TransactionsBetsHistoryYearSelectorContainer = connect(
  state => ({
    walletId: walletIdSelector(state),
    yearOptions: AVAILABLE_YEARS,
    selectedYear: CURRENT_YEAR,
    content: transactionsBetsHistoryContentSelector(state),
    isContentFetched: isPageFetchedSelector(CMS_CONTENT_SLUG)(state),
  }),
  dispatch => ({
    fetchContent: () => dispatch(fetchPageBySlug(CMS_CONTENT_SLUG)),
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    ...dispatchProps,
    fetchYearOverview: year => {
      const { walletId } = stateProps;
      const startTime = DateTime.utc(year);
      const endTime = DateTime.utc(year + 1);

      return getTotalsReq({
        walletId,
        startTime,
        endTime,
      });
    },
  })
)(TransactionsBetsHistoryYearSelector);
