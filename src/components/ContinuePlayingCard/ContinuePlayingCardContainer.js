/* eslint-disable flowtype/no-types-missing-file-annotation */
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import ContinuePlayingCard from "./ContinuePlayingCard";
import { launchGame } from "Models/games";

const ContinuePlayingCardConnected = connect(
  (state, props) => ({
    game: gameSelector(props.id)(state),
  }),
  (dispatch, props) => ({
    onLaunchGame: () => dispatch(launchGame(props.id)),
  })
)(ContinuePlayingCard);

type Props = {
  id: string,
};

const GameTileContainer = ({ id }: Props) => {
  return <ContinuePlayingCardConnected id={id} />;
};

export default GameTileContainer;
