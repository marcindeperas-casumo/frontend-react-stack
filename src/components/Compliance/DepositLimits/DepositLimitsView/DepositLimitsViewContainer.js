// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { INTL_LOCALES } from "Src/constants";
import { marketSelector } from "Models/handshake";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  init,
  getDepositLimitsSelector,
  sendResponsibleGamblingTest,
  limitAdjust,
} from "Models/playOkay/depositLimits";
import { DepositLimitsView } from "./DepositLimitsView";

const cmsKey = "shared.playokay.dgoj.deposit-limits";
export const DepositLimitsViewContainer = connect(
  state => ({
    ...getDepositLimitsSelector(state),
    t: R.prop("fields", getPage(cmsKey)(state)),
    locale: INTL_LOCALES[marketSelector(state)],
  }),
  {
    init,
    limitAdjust,
    sendResponsibleGamblingTest,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsView);
