// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { GameRow } from "Components/GameRow/GameRow";

const GameRowConnected = connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    onLaunchGame: () => dispatch(launchGame(id)),
  })
)(GameRow);

type Props = {
  /** The slug of the game to render */
  id: string,
};

export const GameRowContainer = ({ id }: Props) => <GameRowConnected id={id} />;
