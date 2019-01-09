// @flow
import React from "react";
import { connect } from "react-redux";
import { EVENT_PROPS } from "Src/constants";
import GameListHorizontal from "Components/GameListHorizontal/GameListHorizontal";
import TrackProvider from "Components/TrackProvider";
import { gameListSelector } from "Models/schema";
import { isGameListLoaded } from "Models/games";

type Props = {
  /** The id of the game list. */
  id: string,
};

const GameListHorizontalConnected = connect((state, { id }) => ({
  isLoading: !isGameListLoaded(state),
  list: gameListSelector(id)(state),
}))(GameListHorizontal);

const GameListHorizontalContainer = (props: Props) => (
  <TrackProvider data={{ [EVENT_PROPS.LOCATION]: props.id }}>
    <GameListHorizontalConnected {...props} />
  </TrackProvider>
);

export default GameListHorizontalContainer;
