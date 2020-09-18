// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import cometd from "Models/cometd/cometd.service";
import { playerIdSelector, tournamentChannelsSelector } from "Models/handshake";
import { getCurrentReelRace, getClosestReelRace } from "Models/reelRaces";
import { CurrentReelRaceInfoQuery } from "./useCurrentReelRaceInfo.graphql";
import { useTimeoutFn } from "./useTimeoutFn";

export type CurrentReelRaceInfo = {
  game: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
  startTime: BigInt,
  endTime: BigInt,
  position: number,
  points: number,
  remainingSpins: number,
  isStarted: boolean,
  tournamentId: ?string,
};

type LeaderboardObjectType = {
  [string]: A.CurrentReelRaceInfoQuery_reelRaces_leaderboard,
};

type CreateCurrentReelRaceDataType = {
  tournamentId?: ?string,
  startTime?: number,
  endTime?: number,
  leaderboard?: LeaderboardObjectType,
  game?: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
};

export const UNSET_VALUE = -1;

const defaultReelRaceInfo: CurrentReelRaceInfo = {
  game: null,
  startTime: UNSET_VALUE,
  endTime: UNSET_VALUE,
  position: UNSET_VALUE,
  points: 0,
  remainingSpins: UNSET_VALUE,
  isStarted: false,
  tournamentId: null,
};

export const convertLeaderboardToObject = (
  leaderboard?: ?Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard> = []
): LeaderboardObjectType =>
  leaderboard
    ? leaderboard.reduce(
        (
          acc: LeaderboardObjectType,
          entry: A.CurrentReelRaceInfoQuery_reelRaces_leaderboard
        ) => ({
          ...acc,
          [entry.playerId]: entry,
        }),
        {}
      )
    : {};

export const createCurrentReelRaceData = (
  playerId: ?string,
  {
    tournamentId,
    startTime,
    endTime,
    leaderboard,
    game,
  }: CreateCurrentReelRaceDataType = {
    startTime: UNSET_VALUE,
    endTime: UNSET_VALUE,
    leaderboard: {},
    game: null,
    tournamentId: null,
  }
): CurrentReelRaceInfo => {
  const currentPlayerEntry = leaderboard ? leaderboard[playerId || ""] : null;

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
    isStarted: startTime && startTime >= 0 ? Date.now() >= startTime : false,
    tournamentId,
  };
};

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useCurrentReelRaceInfo(
  gameSlug: ?string
): ?CurrentReelRaceInfo {
  const { data: reelRaceQueryData, loading, refetch } = useQuery<
    A.CurrentReelRaceInfoQuery,
    _
  >(CurrentReelRaceInfoQuery);

  const playerId = useSelector(playerIdSelector, shallowEqual);
  const tournamentChannels = useSelector(tournamentChannelsSelector);
  const refetchTimeout = useTimeoutFn();

  const [
    currentReelRace,
    setCurrentReelRace,
  ] = React.useState<?A.CurrentReelRaceInfoQuery_reelRaces>(null);
  const [
    currentReelRaceData,
    setCurrentReelRaceData,
  ] = React.useState<?CurrentReelRaceInfo>(null);

  const statusHandler = React.useCallback(
    ({ data }) => {
      if (
        currentReelRace?.id === data.tournamentId &&
        data.status === "Started"
      ) {
        setCurrentReelRaceData(
          createCurrentReelRaceData(playerId, {
            ...(currentReelRace
              ? {
                  ...currentReelRace,
                  tournamentId: currentReelRace.id,
                }
              : {}),
          })
        );
      }
    },
    [currentReelRace, playerId]
  );
  const subscriptionHandler = React.useCallback(
    ({ data }: { data: { leaderboard: LeaderboardObjectType } }) => {
      const {
        leaderboard: currentReelRaceLeaderboard,
        ...currentReelRaceRest
      } = currentReelRace || {};

      setCurrentReelRaceData(
        createCurrentReelRaceData(playerId, {
          ...(currentReelRaceRest
            ? {
                ...currentReelRaceRest,
                leaderboard: convertLeaderboardToObject(
                  currentReelRaceLeaderboard
                ),
                tournamentId: currentReelRaceRest.id,
              }
            : {}),
          leaderboard: data.leaderboard,
        })
      );
    },
    [currentReelRace, playerId]
  );

  React.useEffect(() => {
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/players/${playerId}/tournamentEvents/entered`,
        () => {
          refetch();
        }
      )
    );

    return function cleanup() {
      tournamentChannels.forEach(channel =>
        cometd.unsubscribe(
          `${channel}/tournaments/players/${playerId}/tournamentEvents/entered`
        )
      );
    };
  }, [playerId, refetch, tournamentChannels]);

  React.useEffect(() => {
    if (!loading && reelRaceQueryData && reelRaceQueryData.reelRaces) {
      const closestReelRace = getClosestReelRace(reelRaceQueryData.reelRaces);

      refetchTimeout.scheduleAt(
        refetch,
        (closestReelRace ? closestReelRace.endTime : 0) +
          (10 + Math.random() * 60) * 1000
      ); // distribute refetch within 60s

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
            leaderboard: convertLeaderboardToObject(
              localCurrentReelRace.leaderboard
            ),
            game: localCurrentReelRace.game,
            tournamentId: localCurrentReelRace.id,
          })
        );

        localCurrentReelRace.cometdChannels.forEach(channel => {
          cometd.subscribe(
            `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`,
            subscriptionHandler
          );

          cometd.subscribe(
            `${channel}/tournaments/tournamentProperties/status`,
            statusHandler
          );
        });
      }

      return function cleanup() {
        refetchTimeout.clear();
        if (
          localCurrentReelRace &&
          (!gameSlug ||
            (gameSlug && localCurrentReelRace.game.slug === gameSlug))
        ) {
          localCurrentReelRace.cometdChannels.forEach(channel => {
            cometd.unsubscribe(
              `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`
            );
            cometd.subscribe(
              `${channel}/tournaments/tournamentProperties/status`,
              statusHandler
            );
          });
        }
      };
    }
  }, [
    statusHandler,
    gameSlug,
    loading,
    playerId,
    reelRaceQueryData,
    refetch,
    refetchTimeout,
    subscriptionHandler,
  ]);

  return currentReelRaceData;
}
