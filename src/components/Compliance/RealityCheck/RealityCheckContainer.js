// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import {
  REALITY_CHECK_CMS_SLUG,
  realityCheckSelector,
} from "Models/playOkay/realityCheck";
import {
  playerCasumoNameSelector,
  localeSelector,
  currencySelector,
} from "Models/handshake";
import { RealityCheck } from "./RealityCheck";

export const RealityCheckContainer = connect(
  (state, ownProps) => ({
    t: {
      ...ownProps.t,
      ...R.propOr({}, "fields", getPage(REALITY_CHECK_CMS_SLUG)(state)),
    },
    locale: localeSelector(state),
    currency: currencySelector(state),
    casumoName: playerCasumoNameSelector(state),
    realityCheck: realityCheckSelector(state),
  }),
  {
    fetchTranslations: () => fetchPageBySlug(REALITY_CHECK_CMS_SLUG),
  }
)(RealityCheck);
