// @flow
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { GameRow } from "Components/GameRow/GameRow";

export const GameRowContainer = connect(
  (state, { id }: string) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }: string) => ({
    onLaunchGame: () => dispatch(launchGame(id)),
  })
)(GameRow);
