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
import { actions as gameActions } from "Models/games";

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
    onLaunchGame: () => dispatch(gameActions.launchGame(slug)),
  })
)(CuratedCard);

// TODO: Move this logic out from this component
const CuratedContainer = ({ card }: Props) => {
  const slug = `${CURATED_SLUG}.${Array.isArray(card) ? card[0] : card}`;

  return <CuratedConnected slug={slug} />;
};

export default CuratedContainer;
