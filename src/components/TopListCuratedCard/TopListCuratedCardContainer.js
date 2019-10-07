// @flow
import { connect } from "react-redux";
import { FEATURE_FLAGS } from "Src/constants";
import {
  hasMadeFirstDepositSelector,
  featureFlagSelector,
} from "Models/handshake";
import { TopListCuratedCard } from "./TopListCuratedCard";

const enforceOriginalSlugSelector = featureFlagSelector(
  FEATURE_FLAGS.TOP_LIST_CURATED_SHOW_ORIGINAL
);

export const TopListCuratedCardContainer = connect(state => ({
  hasDeposited: hasMadeFirstDepositSelector(state),
  enforceOriginalSlug: enforceOriginalSlugSelector(state),
}))(TopListCuratedCard);
