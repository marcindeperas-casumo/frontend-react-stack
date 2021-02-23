// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";

const cmsKey = "shared.playokay.dgoj.deposit-limits.confirmation-screens";
export const DepositLimitsConfirmationsContainer = connect(
  (state, ownProps) => ({
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsConfirmations);
