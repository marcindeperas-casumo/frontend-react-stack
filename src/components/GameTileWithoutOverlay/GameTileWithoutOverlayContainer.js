import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import GameTileWithoutOverlay from "Components/GameTileWithoutOverlay/GameTileWithoutOverlay";
import { launchGame } from "Models/games";

const GameTileWithoutOverlayConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(launchGame(props.id)),
  })
)(GameTileWithoutOverlay);

// @flow
type Props = {
  id: string,
};

const GameTileWithoutOverlayContainer = ({ id }: Props) => (
  <GameTileWithoutOverlayConnected id={id} />
);

export default GameTileWithoutOverlayContainer;
