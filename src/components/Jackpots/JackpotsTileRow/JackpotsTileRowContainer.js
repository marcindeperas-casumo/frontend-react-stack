import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Services/LaunchGameService";
import JackpotsTileRow from "./JackpotsTileRow";

export default connect((state, { id }) => ({
  game: gameSelector(id)(state),
  launchGame,
}))(JackpotsTileRow);
