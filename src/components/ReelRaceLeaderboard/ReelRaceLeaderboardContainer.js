// @flow
import { connect } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { ReelRaceLeaderboard } from "./ReelRaceLeaderboard";

export default connect(state => ({
  playerId: playerIdSelector(state),
}))(ReelRaceLeaderboard);
