// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay/GameTileWithActiveOverlay";
import { launchGame, isGameInMyList } from "Models/games";

const GameTileWithActiveOverlayConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
    isInMyList: isGameInMyList(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(launchGame(props.id)),
  })
)(GameTileWithActiveOverlay);

type Props = {
  id: string,
};

const GameTileWithActiveOverlayContainer = ({ id }: Props) => (
  <GameTileWithActiveOverlayConnected id={id} />
);

export default GameTileWithActiveOverlayContainer;
