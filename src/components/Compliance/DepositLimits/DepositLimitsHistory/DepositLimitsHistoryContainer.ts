// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  getDepositLimitsHistorySelector,
  getCurrencyAndLocaleSelector,
  getLimitsHistory,
} from "Models/playOkay/depositLimits";
import { DepositLimitsHistory } from "./DepositLimitsHistory";

const cmsKey = "shared.playokay.dgoj.deposit-limits.history";
export const DepositLimitsHistoryContainer = connect(
  (state, ownProps) => ({
    ...getCurrencyAndLocaleSelector(state),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    t: R.prop("fields", getPage(cmsKey)(state)),
    history: getDepositLimitsHistorySelector(state),
  }),
  {
    getLimitsHistory,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsHistory);
