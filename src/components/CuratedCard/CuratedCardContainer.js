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
      ...curatedSelector(slug)(state),
      isFetched: isCuratedLoadedFactory(slug)(state),
    };
  },
  (dispatch, { slug }) => ({
    fetchCurated: () => dispatch(fetchPageBySlug(prefixCuratedSlug(slug))),
    onLaunchGame: (gameId: string) => dispatch(launchGame(gameId)),
  })
)(CuratedCard);
