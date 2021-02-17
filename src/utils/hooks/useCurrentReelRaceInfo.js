// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { useQuery } from "@apollo/client";
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
import { useCallOnce } from "./useCallOnce";

type LeaderboardObjectType = {
  [string]: A.CurrentReelRaceInfoQuery_reelRaces_leaderboard,
};

export type CurrentReelRaceInfo = {
  game: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
  startTime: BigInt,
  endTime: BigInt,
  position: number,
  points: number,
  remainingSpins: number,
  isInProgress: boolean,
  hasEnded: boolean,
  tournamentId: ?string,
  formattedPrizes: Array<string>,
  boosters: A.CurrentReelRaceInfoQuery_reelRaces_leaderboard_boosters,
  leaderboard: Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard>,
};

type CreateCurrentReelRaceDataType = {
  id?: ?string,
  startTime?: number,
  endTime?: number,
  leaderboard?: LeaderboardObjectType,
  formattedPrizes?: Array<string>,
  game?: ?A.CurrentReelRaceInfoQuery_reelRaces_game,
  cometdChannels?: Array<string>,
};

type CometdReelRaceEnteredType = {
  status: string,
  tournamentId: string,
};

type CometdReelRaceFinishedType = {
  tournamentId: string,
  leaderboard: LeaderboardObjectType,
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
  hasEnded: false,
  tournamentId: null,
  formattedPrizes: [],
  leaderboard: [],
  boosters: {
    winsInARow: 0,
    triples: 0,
    wins: 0,
    bigWins: 0,
    megaWins: 0,
  },
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
    formattedPrizes,
    game,
    cometdChannels,
  }: CreateCurrentReelRaceDataType = {
    startTime: UNSET_VALUE,
    endTime: UNSET_VALUE,
    leaderboard: {},
    formattedPrizes: [],
    game: null,
    id: null,
    cometdChannels: [],
  }
): CurrentReelRaceInfo => {
  const currentPlayerEntry = leaderboard ? leaderboard[playerId || ""] : null;

  return {
    ...defaultReelRaceInfo,
    startTime: startTime || defaultReelRaceInfo.startTime,
    endTime: endTime || defaultReelRaceInfo.endTime,
    game,
    cometdChannels,
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
    hasEnded: Boolean(endTime && endTime >= 0 && Date.now() >= endTime),
    tournamentId: id,
    leaderboard: R.pipe(
      R.values,
      R.sortBy(R.prop("position"))
    )(leaderboard),
    formattedPrizes: formattedPrizes || [],
    boosters: R.propOr(
      defaultReelRaceInfo.boosters,
      "boosters",
      currentPlayerEntry
    ),
  };
};

const statusHandler = (
  reelRace?: ?A.CurrentReelRaceInfoQuery_reelRaces,
  setCurrentReelRaceData: CurrentReelRaceInfo => void,
  playerId: string
) => ({ data }: { data: CometdReelRaceEnteredType }) => {
  if (
    reelRace?.id === data.tournamentId &&
    data.status === RACE_STATE.STARTED
  ) {
    const { leaderboard: currentReelRaceLeaderboard, ...currentReelRaceRest } =
      reelRace || {};

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
};

const finishedHandler = (
  reelRace?: ?A.CurrentReelRaceInfoQuery_reelRaces,
  setCurrentReelRaceData: CurrentReelRaceInfo => void,
  playerId: string
) => ({ data }: { data: CometdReelRaceFinishedType }) => {
  if (reelRace?.id === data.tournamentId) {
    const { leaderboard: currentReelRaceLeaderboard, ...currentReelRaceRest } =
      reelRace || {};

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
        leaderboard: data.leaderboard,
        isInProgress: false,
        hasEnded: true,
      }),
    });
  }
};

const reelRaceApplies = (
  localCurrentReelRace?: ?A.CurrentReelRaceInfoQuery_reelRaces,
  localGameSlug: ?string
): boolean =>
  Boolean(
    localCurrentReelRace &&
      (!localGameSlug ||
        (localGameSlug && localCurrentReelRace.game.slug === localGameSlug))
  );

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useCurrentReelRaceInfo(
  gameSlug: ?string
): ?CurrentReelRaceInfo {
  const { data: reelRaceQueryData, loading, refetch } = useQuery<
    A.CurrentReelRaceInfoQuery,
    _
  >(CurrentReelRaceInfoQuery, {
    fetchPolicy: "cache-first",
  });
  // This combined with cache-first fetch policy will make sure that we are not
  // bombarding graphql server with unnecessary requests
  useCallOnce(true, refetch);

  const playerId = useSelector(playerIdSelector, shallowEqual);
  const tournamentChannels = useSelector(tournamentChannelsSelector);
  const refetchTimeout = useTimeoutFn();
  const updateTimeout = useTimeoutFn();
  const [
    currentReelRaceData,
    setCurrentReelRaceData,
  ] = React.useState<?CurrentReelRaceInfo>(null);

  React.useEffect(() => {
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/players/${playerId}/tournamentEvents/entered`,
        refetch
      )
    );

    return function cleanup() {
      tournamentChannels.forEach(channel =>
        cometd.unsubscribe(
          `${channel}/tournaments/players/${playerId}/tournamentEvents/entered`,
          refetch
        )
      );
    };
  }, [playerId, refetch, tournamentChannels]);

  React.useEffect(() => {
    if (!loading && reelRaceQueryData && reelRaceQueryData.reelRaces?.length) {
      const closestReelRace = getClosestReelRace(reelRaceQueryData.reelRaces);
      const localCurrentReelRace = getCurrentReelRace<A.CurrentReelRaceInfoQuery_reelRaces>(
        reelRaceQueryData.reelRaces
      );

      refetchTimeout.scheduleAt(
        refetch,
        Math.floor(
          (closestReelRace ? closestReelRace.endTime : Date.now()) +
            (61 + Math.random() * 60) * 1000
        )
      ); // distribute refetch within 60s

      if (reelRaceApplies(localCurrentReelRace, gameSlug)) {
        setCurrentReelRaceData(
          createCurrentReelRaceData(playerId, {
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            startTime: localCurrentReelRace.startTime,
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            endTime: localCurrentReelRace.endTime,
            leaderboard: convertLeaderboardToObject(
              // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
              localCurrentReelRace.leaderboard
            ),
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            game: localCurrentReelRace.game,
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            id: localCurrentReelRace.id,
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            formattedPrizes: localCurrentReelRace.formattedPrizes,
            // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
            cometdChannels: localCurrentReelRace.cometdChannels,
          })
        );

        // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
        localCurrentReelRace.cometdChannels.forEach(channel => {
          cometd.subscribe(
            `${channel}/tournaments/tournamentProperties/status`,
            statusHandler(
              localCurrentReelRace,
              setCurrentReelRaceData,
              playerId
            )
          );

          cometd.subscribe(
            `${channel}/tournaments/tournamentEvents/finished`,
            finishedHandler(
              localCurrentReelRace,
              setCurrentReelRaceData,
              playerId
            )
          );
        });
      }

      return function cleanup() {
        refetchTimeout.clear();
        updateTimeout.clear();
        if (reelRaceApplies(localCurrentReelRace, gameSlug)) {
          // $FlowIgnoreError: localCurrentReelRace is checked against null inside reelRaceApplies
          localCurrentReelRace.cometdChannels.forEach(channel => {
            cometd.unsubscribe(
              `${channel}/tournaments/tournamentProperties/status`
            );
            cometd.unsubscribe(
              `${channel}/tournaments/tournamentEvents/finished`
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
    updateTimeout,
  ]);

  return currentReelRaceData;
}
