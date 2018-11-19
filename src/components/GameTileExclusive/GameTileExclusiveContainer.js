// @flow
import React from "react";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema/selector";
import { actions as gameActions } from "Models/games";

const mapStateToProps = (state, props) => ({
  game: gameSelector(props.id)(state),
});
const mapDispatchToProps = (dispatch, props) => ({
  onLaunchGame: () => dispatch(gameActions.launchGame(props.id)),
});

const GameTileExclusiveConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameTileExclusive);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const GameTileExclusiveContainer = ({ id }: Props) => (
  <GameTileExclusiveConnected id={id} />
);

export default GameTileExclusiveContainer;
