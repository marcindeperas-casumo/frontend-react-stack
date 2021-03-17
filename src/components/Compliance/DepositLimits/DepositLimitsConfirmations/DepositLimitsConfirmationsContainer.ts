import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsConfirmations } from "./DepositLimitsConfirmations";

const cmsKey = "shared.playokay.dgoj.deposit-limits.confirmation-screens";
export const DepositLimitsConfirmationsContainer = connect(
  (state, ownProps) => ({
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    t: R.prop("fields", getPage(cmsKey)(state)),
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ t, ...props }: Props) => Elem... Remove this comment to see the full error message
)(DepositLimitsConfirmations);
