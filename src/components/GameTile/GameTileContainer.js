// @flow
import React from "react";
import { connect } from "react-redux";
import GameTile from "Components/GameTile/GameTileWrapper";
import { gameSelector } from "Reducers/schema/selector";
import { actions as gameActions } from "Reducers/games";

const GameTileConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(gameActions.launchGame(props.id)),
  })
)(GameTile);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameTileContainer = ({ id }: Props) => <GameTileConnected id={id} />;

export default GameTileContainer;
