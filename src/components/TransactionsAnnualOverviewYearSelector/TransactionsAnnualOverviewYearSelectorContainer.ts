import { connect } from "react-redux";
import { range } from "ramda";
import { navigateById } from "Services/NavigationService";
import logger from "Services/logger";
import { registrationDateSelector } from "Models/handshake";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import {
  CMS_CONTENT_SLUG,
  transactionsBetsHistoryContentSelector,
  isAnnualOverviewFetchingSelector,
  initFetchAnnualOverview,
} from "Models/transactionsBetsHistory";
import { TransactionsAnnualOverviewYearSelector } from "./TransactionsAnnualOverviewYearSelector";

const CURRENT_YEAR = new Date().getFullYear();
const getRegistrationYear = state => {
  // @ts-expect-error: apply fix if you know the context
  return new Date(registrationDateSelector(state)).getFullYear();
};

export const TransactionsAnnualOverviewYearSelectorContainer = connect(
  state => ({
    yearOptions: range(getRegistrationYear(state), CURRENT_YEAR + 1),
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: unknown) => void' is not assignable ... Remove this comment to see the full error message
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
