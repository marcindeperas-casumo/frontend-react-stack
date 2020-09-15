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

export type CurrentReelRaceInfo = {
  game: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
  startTime: BigInt,
  endTime: BigInt,
  position: number,
  points: number,
  remainingSpins: number,
};

const defaultReelRaceInfo: CurrentReelRaceInfo = {
  game: null,
  startTime: -1,
  endTime: -1,
  position: -1,
  points: 0,
  remainingSpins: -1,
};

export const createCurrentReelRaceData = (
  playerId: ?string,
  {
    startTime,
    endTime,
    leaderboard,
    game,
  }: {
    startTime?: number,
    endTime?: number,
    leaderboard?: ?Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard>,
    game?: A.CurrentReelRaceInfoQuery_reelRaces_game,
  }
): CurrentReelRaceInfo => {
  const currentPlayerEntry = R.find(
    R.propEq("playerId", playerId),
    leaderboard
  );

  return {
    ...defaultReelRaceInfo,
    startTime: startTime || defaultReelRaceInfo.startTime,
    endTime: endTime || defaultReelRaceInfo.endTime,
    game,
    position: R.propOr(
      defaultReelRaceInfo.position,
      "position",
      currentPlayerEntry
    ),
    points: R.propOr(defaultReelRaceInfo.points, "points", currentPlayerEntry),
    remainingSpins: R.propOr(
      defaultReelRaceInfo.remainingSpins,
      "remainingSpins",
      currentPlayerEntry
    ),
  };
};

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useCurrentReelRaceInfo(
  gameSlug: ?string
): ?CurrentReelRaceInfo {
  const { data: reelRaceQueryData, loading, error, refetch } = useQuery<
    A.CurrentReelRaceInfoQuery,
    _
  >(CurrentReelRaceInfoQuery);
  const playerId = useSelector(playerIdSelector, shallowEqual);
  const [
    currentReelRace,
    setCurrentReelRace,
  ] = React.useState<?A.CurrentReelRaceInfoQuery_reelRaces>(null);
  const [
    currentReelRaceData,
    setCurrentReelRaceData,
  ] = React.useState<?CurrentReelRaceInfo>(null);

  const subscriptionHandler = React.useCallback(
    ({ data }) => {
      setCurrentReelRaceData(
        createCurrentReelRaceData(playerId, {
          ...(currentReelRace || {}),
          leaderboard: data.leaderboard,
        })
      );
    },
    [currentReelRace, playerId]
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
      const localCurrentReelRace = getCurrentReelRace<A.CurrentReelRaceInfoQuery_reelRaces>(
        reelRaceQueryData.reelRaces
      );

      if (
        localCurrentReelRace &&
        (!gameSlug || (gameSlug && localCurrentReelRace.game.slug === gameSlug))
      ) {
        setCurrentReelRace(localCurrentReelRace);
        setCurrentReelRaceData(
          createCurrentReelRaceData(playerId, {
            startTime: localCurrentReelRace.startTime,
            endTime: localCurrentReelRace.endTime,
            leaderboard: localCurrentReelRace.leaderboard,
            game: localCurrentReelRace.game,
          })
        );

        localCurrentReelRace.cometdChannels.forEach(channel =>
          cometd.subscribe(
            `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`,
            subscriptionHandler
          )
        );
      }

      return function cleanup() {
        if (
          localCurrentReelRace &&
          (!gameSlug ||
            (gameSlug && localCurrentReelRace.game.slug === gameSlug))
        ) {
          localCurrentReelRace.cometdChannels.forEach(channel =>
            cometd.unsubscribe(
              `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`
            )
          );
        }
      };
    }
  }, [
    error,
    gameSlug,
    loading,
    playerId,
    reelRaceQueryData,
    subscriptionHandler,
  ]);

  return currentReelRaceData;
}
