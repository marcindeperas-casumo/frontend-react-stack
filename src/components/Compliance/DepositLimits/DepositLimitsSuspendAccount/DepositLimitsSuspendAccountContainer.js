// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const cmsKey = "shared.playokay.suspend-account";
export const DepositLimitsSuspendAccountContainer = connect(
  (state, ownProps) => ({
    t: R.propOr({}, "fields", getPage(cmsKey)(state)),
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsSuspendAccount);
