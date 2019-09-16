// @flow
import { connect } from "react-redux";
import { CuratedCard } from "Components/CuratedCard/CuratedCard";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";
import {
  curatedSelector,
  isCuratedLoadedFactory,
  getCuratedSlug,
} from "Models/curated";

export const CuratedCardContainer = connect(
  (state, { slug }) => {
    return {
      ...curatedSelector(getCuratedSlug(slug))(state),
      isFetched: isCuratedLoadedFactory(getCuratedSlug(slug))(state),
    };
  },
  (dispatch, { slug, gameId }) => ({
    fetchCurated: () => dispatch(fetchPageBySlug(getCuratedSlug(slug))),
    onLaunchGame: () => dispatch(launchGame(gameId)),
  })
)(CuratedCard);
