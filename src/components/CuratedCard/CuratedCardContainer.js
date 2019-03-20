// @flow
import { connect } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import {
  curatedSelector,
  isCuratedLoadedFactory,
  curatedSlugSelector,
} from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";

export default connect(
  (state, { card }) => {
    const defaultSlug = Array.isArray(card) ? card[0] : card;
    const curatedSlug = curatedSlugSelector(defaultSlug)(state);

    return {
      curatedSlug,
      ...curatedSelector(curatedSlug)(state),
      isFetched: isCuratedLoadedFactory(curatedSlug)(state),
    };
  },
  dispatch => ({
    dispatchFetchCurated: slug => dispatch(fetchPageBySlug(slug)),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
  }),
  (stateProps, dispatchProps) => {
    const { gameId, curatedSlug } = stateProps;
    const { dispatchFetchCurated } = dispatchProps;

    return {
      ...stateProps,
      fetchCurated: () => dispatchFetchCurated(curatedSlug),
      onLaunchGame: () => dispatchProps.dispatchLaunchGame(gameId),
    };
  }
)(CuratedCard);
