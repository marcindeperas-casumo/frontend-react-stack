// @flow
import React from "react";
import { connect } from "react-redux";
import CuratedCard from "Components/CuratedCard/CuratedCard";
import {
  CURATED_SLUG,
  curatedSelector,
  isCuratedLoadedFactory,
} from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { launchGame } from "Models/games";

type Props = {
  card: string | Array<string>,
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

// TODO: Move this logic out from this component
// (The "card" prop can be an array right now, because
// in the CMS the page-relationship selector returns an array)
const CuratedContainer = ({ card }: Props) => {
  const slug = `${CURATED_SLUG}.${Array.isArray(card) ? card[0] : card}`;

  return <CuratedConnected slug={slug} />;
};

export default CuratedContainer;
