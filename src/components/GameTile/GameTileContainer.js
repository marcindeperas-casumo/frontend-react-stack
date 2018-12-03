// @flow
import React from "react";
import { connect } from "react-redux";
import GameTile from "Components/GameTile/GameTileWrapper";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";

const GameTileConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(launchGame(props.id)),
  })
)(GameTile);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameTileContainer = ({ id }: Props) => <GameTileConnected id={id} />;

export default GameTileContainer;
