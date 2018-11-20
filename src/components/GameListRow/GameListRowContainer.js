// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema/selector";
import { launchGame } from "Models/games";
import GameListRow from "Components/GameListRow/GameListRow";

const GameListRowConnected = connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    onLaunchGame: () => dispatch(launchGame(id)),
  })
)(GameListRow);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameListRowContainer = ({ id }: Props) => (
  <GameListRowConnected id={id} />
);

export default GameListRowContainer;
