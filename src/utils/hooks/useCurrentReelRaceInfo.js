// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import cometd from "Models/cometd/cometd.service";
import { playerIdSelector, tournamentChannelsSelector } from "Models/handshake";
import {
  getCurrentReelRace,
  getClosestReelRace,
  RACE_STATE,
} from "Models/reelRaces";
import { CurrentReelRaceInfoQuery } from "./useCurrentReelRaceInfo.graphql";
import { useTimeoutFn } from "./useTimeoutFn";

export type CurrentReelRaceInfo = {
  game: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
  startTime: BigInt,
  endTime: BigInt,
  position: number,
  points: number,
  remainingSpins: number,
  isInProgress: boolean,
  tournamentId: ?string,
};

type LeaderboardObjectType = {
  [string]: A.CurrentReelRaceInfoQuery_reelRaces_leaderboard,
};

type CreateCurrentReelRaceDataType = {
  id?: ?string,
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
  isInProgress: false,
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
    id,
    startTime,
    endTime,
    leaderboard,
    game,
  }: CreateCurrentReelRaceDataType = {
    startTime: UNSET_VALUE,
    endTime: UNSET_VALUE,
    leaderboard: {},
    game: null,
    id: null,
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
    isInProgress: Boolean(
      startTime &&
        startTime >= 0 &&
        Date.now() >= startTime &&
        endTime &&
        endTime >= 0 &&
        Date.now() < endTime
    ),
    tournamentId: id,
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
  >(CurrentReelRaceInfoQuery, { fetchPolicy: "network-only" });

  const playerId = useSelector(playerIdSelector, shallowEqual);
  const tournamentChannels = useSelector(tournamentChannelsSelector);
  const refetchTimeout = useTimeoutFn();

  const [
    currentReelRaceData,
    setCurrentReelRaceData,
  ] = React.useState<?CurrentReelRaceInfo>(null);

  const statusHandler = React.useCallback(
    reelRace => ({ data }) => {
      if (
        reelRace?.id === data.tournamentId &&
        data.status === RACE_STATE.STARTED
      ) {
        const {
          leaderboard: currentReelRaceLeaderboard,
          ...currentReelRaceRest
        } = reelRace || {};

        setCurrentReelRaceData({
          ...createCurrentReelRaceData(playerId, {
            ...(currentReelRaceRest
              ? {
                  ...currentReelRaceRest,
                  leaderboard: convertLeaderboardToObject(
                    currentReelRaceLeaderboard
                  ),
                }
              : {}),
            isInProgress: true,
          }),
        });
      }
    },
    [playerId]
  );
  const subscriptionHandler = React.useCallback(
    reelRace => ({
      data,
    }: {
      data: { leaderboard: LeaderboardObjectType },
    }) => {
      const {
        leaderboard: currentReelRaceLeaderboard,
        ...currentReelRaceRest
      } = reelRace || {};

      setCurrentReelRaceData(
        createCurrentReelRaceData(playerId, {
          ...(currentReelRaceRest
            ? {
                ...currentReelRaceRest,
                leaderboard: convertLeaderboardToObject(
                  currentReelRaceLeaderboard
                ),
              }
            : {}),
          leaderboard: data.leaderboard,
        })
      );
    },
    [playerId]
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
    const reelRaceApplies = (
      localCurrentReelRace: ?A.CurrentReelRaceInfoQuery_reelRaces,
      localGameSlug: ?string
    ): boolean =>
      Boolean(
        localCurrentReelRace &&
          (!localGameSlug ||
            (localGameSlug && localCurrentReelRace.game.slug === localGameSlug))
      );

    if (!loading && reelRaceQueryData && reelRaceQueryData.reelRaces) {
      const closestReelRace = getClosestReelRace(reelRaceQueryData.reelRaces);

      refetchTimeout.scheduleAt(
        refetch,
        (closestReelRace ? closestReelRace.endTime : 0) +
          (3 + Math.random() * 30) * 1000
      ); // distribute refetch within 30s

      const localCurrentReelRace = getCurrentReelRace<A.CurrentReelRaceInfoQuery_reelRaces>(
        reelRaceQueryData.reelRaces
      );

      if (
        localCurrentReelRace &&
        reelRaceApplies(localCurrentReelRace, gameSlug)
      ) {
        setCurrentReelRaceData(
          createCurrentReelRaceData(playerId, {
            startTime: localCurrentReelRace.startTime,
            endTime: localCurrentReelRace.endTime,
            leaderboard: convertLeaderboardToObject(
              localCurrentReelRace.leaderboard
            ),
            game: localCurrentReelRace.game,
            id: localCurrentReelRace.id,
          })
        );

        localCurrentReelRace.cometdChannels.forEach(channel => {
          cometd.subscribe(
            `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`,
            subscriptionHandler(localCurrentReelRace)
          );

          cometd.subscribe(
            `${channel}/tournaments/tournamentProperties/status`,
            statusHandler(localCurrentReelRace)
          );
        });
      } else {
        setCurrentReelRaceData(prevData => ({
          ...prevData,
          isInProgress: false,
        }));
      }

      return function cleanup() {
        refetchTimeout.clear();
        if (
          localCurrentReelRace &&
          reelRaceApplies(localCurrentReelRace, gameSlug)
        ) {
          localCurrentReelRace.cometdChannels.forEach(channel => {
            cometd.unsubscribe(
              `${channel}/tournaments/players/${playerId}/tournaments/${localCurrentReelRace.id}/leaderboard`
            );
            cometd.unsubscribe(
              `${channel}/tournaments/tournamentProperties/status`
            );
          });
        }
      };
    }
  }, [
    gameSlug,
    loading,
    playerId,
    reelRaceQueryData,
    refetch,
    refetchTimeout,
    subscriptionHandler,
    statusHandler,
  ]);

  return currentReelRaceData;
}
