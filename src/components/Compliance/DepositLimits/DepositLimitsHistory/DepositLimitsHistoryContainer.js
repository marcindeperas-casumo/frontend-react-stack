// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { currencySelector } from "Models/handshake";
import {
  getDepositLimitsHistorySelector,
  getLimitsHistory,
} from "Models/playOkay/depositLimits";
import { DepositLimitsHistory } from "./DepositLimitsHistory";

const cmsKey = "shared.playokay.dgoj.deposit-limits.history";
export const DepositLimitsHistoryContainer = connect(
  (state, ownProps) => ({
    t: R.prop("fields", getPage(cmsKey)(state)),
    currency: ownProps.currency || currencySelector(state),
    history: getDepositLimitsHistorySelector(state),
  }),
  {
    getLimitsHistory,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsHistory);
