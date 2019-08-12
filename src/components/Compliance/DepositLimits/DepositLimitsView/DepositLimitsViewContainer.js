// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { INTL_LOCALES } from "Src/constants";
import { currencySelector, marketSelector } from "Models/handshake";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  init,
  getDepositLimitsSelector,
  limitAdjust,
  limitCancel,
} from "Models/playOkay/depositLimits";
import { DepositLimitsView } from "./DepositLimitsView";

const cmsKey = "shared.playokay.dgoj.deposit-limits";
export const DepositLimitsViewContainer = connect(
  state => {
    const depositLimits = getDepositLimitsSelector(state);

    return {
      ...depositLimits,
      currency: R.pathOr(
        currencySelector(state), // we're falling back to currency from handshake only when it's not present in limits
        ["limits", "currency"],
        depositLimits
      ),
      t: R.prop("fields", getPage(cmsKey)(state)),
      locale: INTL_LOCALES[marketSelector(state)],
    };
  },
  {
    init,
    limitAdjust,
    limitCancel,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsView);
