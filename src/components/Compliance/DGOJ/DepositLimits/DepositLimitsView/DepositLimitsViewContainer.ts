import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  init,
  getDepositLimitsSelector,
  getCurrencyAndLocaleSelector,
  limitAdjust,
  limitCancel,
} from "Models/playOkay/dgojDepositLimits";
import { DepositLimitsView } from "./DepositLimitsView";

const cmsKey = "shared.playokay.dgoj.deposit-limits";
export const DepositLimitsViewContainer = connect(
  state => ({
    ...getDepositLimitsSelector(state),
    ...getCurrencyAndLocaleSelector(state),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    init,
    limitAdjust,
    limitCancel,
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(props: Props) => Element | "loa... Remove this comment to see the full error message
)(DepositLimitsView);
