// @flow
import { connect } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { reelRaceWidgetSelector } from "Models/reelRaceWidget";
import {
  subscribeReelRacePlayerLeaderboard,
  unsubscribeReelRacePlayerLeaderboard,
  subscribeReelRaceLeaderboard,
  unsubscribeReelRaceLeaderboard,
} from "Models/cometd";
import { ReelRaceLeaderboardWidget } from "./ReelRaceLeaderboardWidget";

export default connect(
  (state, { tournamentId }) => {
    const { leaderboard } = reelRaceWidgetSelector(state);

    return {
      tournamentId,
      leaderboard,
      playerId: playerIdSelector(state),
    };
  },
  dispatch => ({
    subscribeUpdates: (tournamentId, playerId) => {
      dispatch(subscribeReelRacePlayerLeaderboard(tournamentId, playerId));
      dispatch(subscribeReelRaceLeaderboard(tournamentId, playerId));
    },
    unsubscribeUpdates: (tournamentId, playerId) => {
      dispatch(unsubscribeReelRacePlayerLeaderboard(tournamentId, playerId));
      dispatch(unsubscribeReelRaceLeaderboard(tournamentId, playerId));
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { playerId } = stateProps;
    const { tournamentId } = ownProps;

    return {
      ...stateProps,
      ...dispatchProps,
      subscribeUpdates: () =>
        dispatchProps.subscribeUpdates(tournamentId, playerId),
      unsubscribeUpdates: () =>
        dispatchProps.unsubscribeUpdates(tournamentId, playerId),
    };
  }
)(ReelRaceLeaderboardWidget);
