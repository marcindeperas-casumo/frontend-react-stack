// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  init,
  getDepositLimitsSelector,
  getCurrencyAndLocaleSelector,
  limitAdjust,
  limitCancel,
} from "Models/playOkay/depositLimits";
import { DepositLimitsView } from "./DepositLimitsView";

const cmsKey = "shared.playokay.dgoj.deposit-limits";
export const DepositLimitsViewContainer = connect(
  state => ({
    ...getDepositLimitsSelector(state),
    ...getCurrencyAndLocaleSelector(state),
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    init,
    limitAdjust,
    limitCancel,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsView);
