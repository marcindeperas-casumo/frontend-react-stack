import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Reducers/games";
import JackpotsTileRow from "./JackpotsTileRow";

export default connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    launchGame: () => dispatch(launchGame(id)),
  })
)(JackpotsTileRow);
