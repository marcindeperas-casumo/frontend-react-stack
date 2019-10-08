// @flow
import { connect } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { ReelRaceLeaderboardWidget } from "./ReelRaceLeaderboardWidget";

export default connect(state => ({
  playerId: playerIdSelector(state),
}))(ReelRaceLeaderboardWidget);
