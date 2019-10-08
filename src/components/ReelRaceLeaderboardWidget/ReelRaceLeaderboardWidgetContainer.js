// @flow
import { connect } from "react-redux";
import { reelRacePlayerBoostersSelector } from "Models/reelRaceLeaderboard";
import { playerIdSelector } from "Models/handshake";
import { ReelRaceLeaderboardWidget } from "./ReelRaceLeaderboardWidget";

export default connect(state => ({
  playerId: playerIdSelector(state),
  playerBoosters: reelRacePlayerBoostersSelector(state),
}))(ReelRaceLeaderboardWidget);
