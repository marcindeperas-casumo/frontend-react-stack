import React from "react";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Reducers/games";
import GameRow from "Components/GameRow/GameRow";

const mapStateToProps = (state, { id }) => ({
  game: gameSelector(id)(state),
});
const mapDispatchToProps = (dispatch, { id }) => ({
  launchGame: () => dispatch(launchGame(id)),
});

const GameRowConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRow);

const GameRowContainer = ({ id }) => <GameRowConnected id={id} />;

export default GameRowContainer;
