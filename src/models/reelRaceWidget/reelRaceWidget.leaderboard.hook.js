// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { tournamentChannelsSelector, playerIdSelector } from "Models/handshake";
import { reelRaceStartedSelector } from "Models/reelRaceWidget";

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useReelRaceLeaderboard() {
  const [leaderboard, setLeaderboard] = React.useState([]);

  const { tournamentId, leaderboard: reelRaceLeaderboard } = useSelector(
    reelRaceStartedSelector,
    shallowEqual
  );

  const playerId = useSelector(playerIdSelector, shallowEqual);
  const tournamentChannels = useSelector(
    tournamentChannelsSelector,
    shallowEqual
  );

  const subscriptionHandler = ({ data }) => {
    const sorted = R.pipe(
      R.values,
      R.sortBy(R.prop("position"))
    )(data.leaderboard);
    const playerPosition = R.findIndex(R.propEq("playerId", playerId), sorted);
    const visibleLeaderboard = R.uniqBy(
      R.prop("playerId"),
      R.concat(
        R.take(3, sorted),
        R.slice(playerPosition - 2, playerPosition + 1, sorted)
      )
    );

    setLeaderboard(visibleLeaderboard);
  };

  React.useEffect(() => {
    setLeaderboard(reelRaceLeaderboard);
    // why do we have to subscribe to all channels?
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
        subscriptionHandler
      )
    );

    return function cleanup() {
      tournamentChannels.forEach(channel =>
        cometd.unsubscribe(
          `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId, tournamentChannels]);

  return leaderboard;
}
