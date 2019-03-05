// @flow
import React from "react";
import { connect } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import {
  curatedSelector,
  isCuratedLoadedFactory,
  curatedSlugSelector,
} from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";

type Props = {
  card: string | Array<string>,
};

const CuratedConnected = connect(
  (state, { defaultCard }) => {
    const defaultSlug = Array.isArray(defaultCard)
      ? defaultCard[0]
      : defaultCard;
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

const CuratedContainer = ({ card }: Props) => {
  return <CuratedConnected defaultCard={card} />;
};

export default CuratedContainer;
