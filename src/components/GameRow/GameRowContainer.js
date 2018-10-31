import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Reducers/games";
import GameRow from "Components/GameRow/GameRow";

export default connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    launchGame: () => dispatch(launchGame(id)),
  })
)(GameRow);
