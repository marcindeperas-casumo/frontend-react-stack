// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsForm } from "./DepositLimitsForm";

const cmsKey = "shared.playokay.dgoj.deposit-limits.input-validation";
export const DepositLimitsFormContainer = connect(
  (state, ownProps) => ({
    t: {
      ...ownProps.t,
      input_validation: R.propOr({}, "fields", getPage(cmsKey)(state)),
    },
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsForm);
