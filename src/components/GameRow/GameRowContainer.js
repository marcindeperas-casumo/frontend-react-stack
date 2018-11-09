// @flow
import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Reducers/games";
import GameRow from "Components/GameRow/GameRow";

const mapStateToProps = (state, { id }) => ({
  game: gameSelector(id)(state),
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onLaunchGame: () => dispatch(launchGame(id)),
});

const GameRowConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRow);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameRowContainer = ({ id }: Props) => <GameRowConnected id={id} />;

export default GameRowContainer;
