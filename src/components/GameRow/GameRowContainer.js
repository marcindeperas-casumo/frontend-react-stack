// @flow
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { GameRow } from "Components/GameRow/GameRow";

export const GameRowContainer = connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    onLaunchGame: () => dispatch(launchGame(id)),
  })
)(GameRow);
