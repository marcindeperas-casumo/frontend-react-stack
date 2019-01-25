// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";

const GameRowSearchConnected = connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    onLaunchGame: () => dispatch(launchGame(id)),
  })
)(GameRowSearch);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameRowSearchContainer = ({ id }: Props) => (
  <GameRowSearchConnected id={id} />
);

export default GameRowSearchContainer;
