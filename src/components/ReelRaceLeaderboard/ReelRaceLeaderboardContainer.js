// @flow
import { connect } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { ReelRaceLeaderboard } from "./ReelRaceLeaderboard";

export const ReelRaceLeaderboardContainer = connect(state => ({
  playerId: playerIdSelector(state),
}))(ReelRaceLeaderboard);
