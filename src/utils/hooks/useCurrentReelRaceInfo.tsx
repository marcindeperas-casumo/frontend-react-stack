import { useQuery } from "@apollo/client";
import * as React from "react";
import * as R from "ramda";
import { useSelector, shallowEqual } from "react-redux";
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
  [s: string]: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"];
};

export type CurrentReelRaceInfo = {
  game: A.CurrentReelRaceInfoQuery["reelRaces"][number]["game"] | undefined;
  startTime: number;
  endTime: number;
  position: number;
  points: number;
  remainingSpins: number;
  isInProgress: boolean;
  optedIn: boolean;
  hasEnded: boolean;
  tournamentId: string | undefined;
  formattedPrizes: Array<string>;
  boosters: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"][number]["boosters"];
  leaderboard: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"];
};

type CreateCurrentReelRaceDataType = {
  id?: string | undefined;
  optedIn?: boolean;
  startTime?: number;
  endTime?: number;
  leaderboard?: LeaderboardObjectType;
  formattedPrizes?: Array<string>;
  game?: A.CurrentReelRaceInfoQuery["reelRaces"][number]["game"] | undefined;
  cometdChannels?: Array<string>;
};

type CometdReelRaceEnteredType = {
  status: string;
  tournamentId: string;
};

type CometdReelRaceFinishedType = {
  tournamentId: string;
  leaderboard: LeaderboardObjectType;
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
  optedIn: false,
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
  // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
  leaderboard?: Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard> = []
): LeaderboardObjectType =>
  leaderboard
    ? leaderboard.reduce(
        (
          acc: LeaderboardObjectType,
          entry: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"]
        ) => ({
          ...acc,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerId' does not exist on type '{ play... Remove this comment to see the full error message
          [entry.playerId]: entry,
        }),
        {}
      )
    : {};

export const createCurrentReelRaceData = (
  playerId: string | undefined,
  {
    id,
    startTime,
    endTime,
    leaderboard,
    formattedPrizes,
    game,
    optedIn,
    cometdChannels,
  }: CreateCurrentReelRaceDataType = {
    startTime: UNSET_VALUE,
    endTime: UNSET_VALUE,
    leaderboard: {},
    formattedPrizes: [],
    game: null,
    optedIn: false,
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
    optedIn,
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ playerId: string; playerName: string; posi... Remove this comment to see the full error message
    leaderboard: R.pipe(R.values, R.sortBy(R.prop("position")))(leaderboard),
    formattedPrizes: formattedPrizes || [],
    boosters: R.propOr(
      defaultReelRaceInfo.boosters,
      "boosters",
      currentPlayerEntry
    ),
  };
};

const statusHandler = (
  reelRace?: A.CurrentReelRaceInfoQuery["reelRaces"] | undefined,
  // @ts-expect-error ts-migrate(1016) FIXME: A required parameter cannot follow an optional par... Remove this comment to see the full error message
  setCurrentReelRaceData: (x: CurrentReelRaceInfo) => void,
  playerId: string
) => ({ data }: { data: CometdReelRaceEnteredType }) => {
  if (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ id: string... Remove this comment to see the full error message
    reelRace?.id === data.tournamentId &&
    data.status === RACE_STATE.STARTED
  ) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderboard' does not exist on type '{ i... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ isInProgress: boolean; leaderb... Remove this comment to see the full error message
        isInProgress: true,
      }),
    });
  }
};

const finishedHandler = (
  reelRace?: A.CurrentReelRaceInfoQuery["reelRaces"] | undefined,
  // @ts-expect-error ts-migrate(1016) FIXME: A required parameter cannot follow an optional par... Remove this comment to see the full error message
  setCurrentReelRaceData: (x: CurrentReelRaceInfo) => void,
  playerId: string
) => ({ data }: { data: CometdReelRaceFinishedType }) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ id: string... Remove this comment to see the full error message
  if (reelRace?.id === data.tournamentId) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderboard' does not exist on type '{ i... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ leaderboard: LeaderboardObject... Remove this comment to see the full error message
        isInProgress: false,
        hasEnded: true,
      }),
    });
  }
};

const reelRaceApplies = (
  localCurrentReelRace?: A.CurrentReelRaceInfoQuery["reelRaces"] | undefined,
  // @ts-expect-error ts-migrate(1016) FIXME: A required parameter cannot follow an optional par... Remove this comment to see the full error message
  localGameSlug: string | undefined
): boolean =>
  Boolean(
    localCurrentReelRace &&
      (!localGameSlug ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'game' does not exist on type '{ id: stri... Remove this comment to see the full error message
        (localGameSlug && localCurrentReelRace.game.slug === localGameSlug))
  );

// After is mounted we show initial leaderboard from reelRace.
// It shows new leaderboard only when event happens.
export function useCurrentReelRaceInfo(
  gameSlug?: string | undefined
): CurrentReelRaceInfo | undefined {
  const { data: reelRaceQueryData, loading, refetch } = useQuery<
    A.CurrentReelRaceInfoQuery,
    A.CurrentReelRaceInfoQueryVariables
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
  ] = React.useState<CurrentReelRaceInfo | null>(null);

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
      const localCurrentReelRace = getCurrentReelRace<
        A.CurrentReelRaceInfoQuery["reelRaces"]
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ id: string; startTime: number;... Remove this comment to see the full error message
      >(reelRaceQueryData.reelRaces);

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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'startTime' does not exist on type '{ id:... Remove this comment to see the full error message
            startTime: localCurrentReelRace.startTime,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'endTime' does not exist on type '{ id: s... Remove this comment to see the full error message
            endTime: localCurrentReelRace.endTime,
            leaderboard: convertLeaderboardToObject(
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderboard' does not exist on type '{ i... Remove this comment to see the full error message
              localCurrentReelRace.leaderboard
            ),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'game' does not exist on type '{ id: stri... Remove this comment to see the full error message
            game: localCurrentReelRace.game,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ id: string... Remove this comment to see the full error message
            id: localCurrentReelRace.id,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'formattedPrizes' does not exist on type ... Remove this comment to see the full error message
            formattedPrizes: localCurrentReelRace.formattedPrizes,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cometdChannels' does not exist on type '... Remove this comment to see the full error message
            cometdChannels: localCurrentReelRace.cometdChannels,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'optedIn' does not exist on type '{ id: s... Remove this comment to see the full error message
            optedIn: localCurrentReelRace.optedIn,
          })
        );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cometdChannels' does not exist on type '... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'cometdChannels' does not exist on type '... Remove this comment to see the full error message
          localCurrentReelRace.cometdChannels.forEach(channel => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            cometd.unsubscribe(
              `${channel}/tournaments/tournamentProperties/status`
            );
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
