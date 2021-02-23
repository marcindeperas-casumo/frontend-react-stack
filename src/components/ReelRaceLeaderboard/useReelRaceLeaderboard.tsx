// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import * as A from "Types/apollo";
import cometd from "Models/cometd/cometd.service";
import { playerIdSelector } from "Models/handshake";

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useReelRaceLeaderboard(
  tournamentId: string,
  cometdChannels: Array<string>,
  initialLeaderboard: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard> = []
): Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard> {
  const [leaderboard, setLeaderboard] = React.useState([]);
  const playerId = useSelector(playerIdSelector, shallowEqual);

  const getVisibleLeaderboard = list => {
    const sorted = R.pipe(
      R.values,
      R.sortBy(R.prop("position"))
    )(list);
    const playerPosition = R.findIndex(R.propEq("playerId", playerId), sorted);
    return R.uniqBy(
      R.prop("playerId"),
      R.concat(
        R.take(3, sorted),
        R.slice(playerPosition - 2, playerPosition + 1, sorted)
      )
    );
  };

  const subscriptionHandler = ({ data }) => {
    setLeaderboard(getVisibleLeaderboard(data.leaderboard));
  };

  React.useEffect(() => {
    setLeaderboard(getVisibleLeaderboard(initialLeaderboard));
    // why do we have to subscribe to all channels?
    cometdChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
        subscriptionHandler
      )
    );

    return function cleanup() {
      cometdChannels.forEach(channel =>
        cometd.unsubscribe(
          `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentId, cometdChannels]);

  return leaderboard;
}
