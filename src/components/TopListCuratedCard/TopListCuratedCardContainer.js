// @flow
import { connect } from "react-redux";
import { FEATURE_FLAGS, VERTICALS } from "Src/constants";
import {
  hasMadeFirstDepositSelector,
  featureFlagSelector,
  verticalSelector,
} from "Models/handshake";
import { TopListCuratedCard } from "./TopListCuratedCard";

const shouldShowOriginalCuratedSelector = featureFlagSelector(
  FEATURE_FLAGS.TOP_LIST_CURATED_SHOW_ORIGINAL
);

const isSportsPlayerSelector = state =>
  verticalSelector(state) === VERTICALS.SPORTS;

const enforceOriginalSlugSelector = state =>
  shouldShowOriginalCuratedSelector(state) || isSportsPlayerSelector(state);

export const TopListCuratedCardContainer = connect(state => ({
  hasDeposited: hasMadeFirstDepositSelector(state),
  enforceOriginalSlug: enforceOriginalSlugSelector(state),
}))(TopListCuratedCard);
