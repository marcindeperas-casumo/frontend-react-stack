// @flow
import { connect } from "react-redux";
import { tournamentChannelsSelector, playerIdSelector } from "Models/handshake";
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
      tournamentChannels: tournamentChannelsSelector(state),
    };
  },
  dispatch => ({
    subscribeUpdates: (tournamentChannels, tournamentId, playerId) => {
      tournamentChannels.map(channelPrefix => {
        return dispatch(
          subscribeReelRacePlayerLeaderboard(
            channelPrefix,
            tournamentId,
            playerId
          )
        );
      });
      dispatch(subscribeReelRaceLeaderboard(tournamentId, playerId));
    },
    unsubscribeUpdates: (tournamentChannels, tournamentId, playerId) => {
      tournamentChannels.map(channelPrefix => {
        return dispatch(
          unsubscribeReelRacePlayerLeaderboard(
            channelPrefix,
            tournamentId,
            playerId
          )
        );
      });
      dispatch(unsubscribeReelRaceLeaderboard(tournamentId, playerId));
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { playerId, tournamentChannels } = stateProps;
    const { tournamentId } = ownProps;

    return {
      ...stateProps,
      ...dispatchProps,
      subscribeUpdates: () =>
        dispatchProps.subscribeUpdates(
          tournamentChannels,
          tournamentId,
          playerId
        ),
      unsubscribeUpdates: () =>
        dispatchProps.unsubscribeUpdates(
          tournamentChannels,
          tournamentId,
          playerId
        ),
    };
  }
)(ReelRaceLeaderboardWidget);
