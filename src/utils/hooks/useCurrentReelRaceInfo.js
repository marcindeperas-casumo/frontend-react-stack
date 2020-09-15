// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import cometd from "Models/cometd/cometd.service";
import { playerIdSelector } from "Models/handshake";
import { getCurrentReelRace } from "Models/reelRaces";
import { CurrentReelRaceInfoQuery } from "./useCurrentReelRaceInfo.graphql";

export const calculateProgress = (
  startTime: ?number = null,
  endTime: ?number = null,
  now: number = Date.now()
) => {
  if (!startTime || !endTime || now < startTime) {
    return 0;
  }
  if (now >= endTime) {
    return 1;
  }
  return (now - startTime) / (endTime - startTime);
};

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useCurrentReelRaceInfo(): ?A.ReelRaceWidgetQuery_reelRaces_current {
  const { data: reelRaceQueryData, loading, refetch } = useQuery<
    A.ReelRaceWidgetQuery,
    _
  >(CurrentReelRaceInfoQuery);
  const playerId = useSelector(playerIdSelector, shallowEqual);

  const [currentReelRace, setCurrentReelRace] = React.useState({});

  const [currentReelRaceData, setCurrentReelRaceData] = React.useState(null);

  const createCurrentReelRaceData = React.useCallback(
    ({ startTime, endTime, leaderboard }: A.ReelRaceWidgetQuery_reelRaces) => {
      const currentPlayerEntry = R.find(
        R.propEq("playerId", playerId),
        leaderboard
      );

      return {
        progress: calculateProgress(startTime, endTime),
        position: -1,
        points: -1,
        remainingSpins: -1,
        ...R.props(
          ["position", "points", "remainingSpins"],
          currentPlayerEntry
        ),
      };
    },
    [playerId]
  );
  const subscriptionHandler = React.useCallback(
    ({ data }) => {
      setCurrentReelRaceData(
        createCurrentReelRaceData({
          ...currentReelRace,
          leaderboard: data.leaderboard,
        })
      );
    },
    [createCurrentReelRaceData, currentReelRace]
  );

  React.useEffect(() => {
    let timeoutId; // eslint-disable-line fp/no-let
    const thirtyMinutes = 30 * 60 * 1000;

    function scheduleTimeout() {
      const nextUpdate = thirtyMinutes - (Date.now() % thirtyMinutes);
      // eslint-disable-next-line fp/no-mutation
      timeoutId = setTimeout(() => {
        refetch();
        scheduleTimeout();
      }, nextUpdate);
    }

    scheduleTimeout();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [refetch]);

  React.useEffect(() => {
    if (!loading && reelRaceQueryData && reelRaceQueryData.reelRaces) {
      const localCurrentReelRace = getCurrentReelRace(
        reelRaceQueryData.reelRaces
      );

      if (localCurrentReelRace) {
        setCurrentReelRace(localCurrentReelRace);
        setCurrentReelRaceData(createCurrentReelRaceData(localCurrentReelRace));

        localCurrentReelRace.cometdChannels.forEach(channel =>
          cometd.subscribe(
            `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`,
            subscriptionHandler
          )
        );
      }

      return function cleanup() {
        if (localCurrentReelRace) {
          localCurrentReelRace.cometdChannels.forEach(channel =>
            cometd.unsubscribe(
              `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`
            )
          );
        }
      };
    }
  }, [
    createCurrentReelRaceData,
    loading,
    playerId,
    reelRaceQueryData,
    subscriptionHandler,
  ]);

  return currentReelRaceData;
}
