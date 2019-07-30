// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsSummary } from "./DepositLimitsSummary";

const cmsKey = "shared.playokay.dgoj.deposit-limits.rules";
export const DepositLimitsSummaryContainer = connect(
  (state, ownProps) => ({
    t: {
      ...ownProps.t,
      ...R.propOr({}, "fields", getPage(cmsKey)(state)),
    },
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsSummary);
