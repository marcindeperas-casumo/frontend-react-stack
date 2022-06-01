import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsForm } from "./DepositLimitsForm";

const cmsKey = "shared.playokay.dgoj.deposit-limits.input-validation";
export const DepositLimitsFormContainer = connect(
  (state, ownProps) => ({
    t: {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 't' does not exist on type '{}'.
      ...ownProps.t,
      input_validation: R.propOr({}, "fields", getPage(cmsKey)(state)),
    },
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsForm);
