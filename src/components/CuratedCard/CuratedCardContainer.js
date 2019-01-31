// @flow
import React from "react";
import { connect } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import { curatedSelector, isCuratedLoadedFactory } from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";

type Props = {
  slug: string,
};

const CuratedConnected = connect(
  (state, { slug }) => ({
    ...curatedSelector(slug)(state),
    isFetched: isCuratedLoadedFactory(slug)(state),
  }),
  (dispatch, { slug }) => ({
    fetchCurated: () => dispatch(fetchPageBySlug(slug)),
    dispatchLaunchGame: id => dispatch(launchGame(id)),
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { gameId } = stateProps;

    return {
      ...stateProps,
      ...dispatchProps,
      onLaunchGame: () => dispatchProps.dispatchLaunchGame(gameId),
    };
  }
)(CuratedCard);

const CuratedContainer = ({ slug }: Props) => {
  return <CuratedConnected slug={slug} />;
};

export default CuratedContainer;
