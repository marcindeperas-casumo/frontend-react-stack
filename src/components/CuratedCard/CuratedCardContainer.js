// @flow
import { connect } from "react-redux";
import { CuratedCard } from "Components/CuratedCard/CuratedCard";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";
import {
  curatedSelector,
  isCuratedLoadedFactory,
  prefixCuratedSlug,
} from "Models/curated";

export const CuratedCardContainer = connect(
  (state, { slug }) => {
    return {
      ...curatedSelector(prefixCuratedSlug(slug))(state),
      isFetched: isCuratedLoadedFactory(prefixCuratedSlug(slug))(state),
    };
  },
  (dispatch, { slug, gameId }) => ({
    fetchCurated: () => dispatch(fetchPageBySlug(prefixCuratedSlug(slug))),
    onLaunchGame: () => dispatch(launchGame(gameId)),
  })
)(CuratedCard);
