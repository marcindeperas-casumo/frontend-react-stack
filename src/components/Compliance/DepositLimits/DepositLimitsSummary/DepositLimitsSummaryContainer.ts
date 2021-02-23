// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { DepositLimitsSummary } from "./DepositLimitsSummary";

const cmsKey = "shared.playokay.dgoj.deposit-limits.rules";
export const DepositLimitsSummaryContainer = connect(
  (state, ownProps) => ({
    t: {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 't' does not exist on type '{}'.
      ...ownProps.t,
      // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
      ...R.propOr({}, "fields", getPage(cmsKey)(state)),
    },
  }),
  {
    fetchTranslations: () => fetchPageBySlug(cmsKey),
  }
)(DepositLimitsSummary);
