// @flow
import * as A from "Types/apollo";
import type { CometdLeaderboard } from "./reelRaces.types";

type LeaderboardUpdate = {
  // @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
  [string]: CometdLeaderboard,
};

export type Action =
  | {
      type: "RR/INITIALIZE_LEADERBOARD",
      initialLeaderboard: Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard>,
    }
  | {
      type: "RR/UPDATE_LEADERBOARD",
      leaderboard: LeaderboardUpdate,
    };

export const initializeLeaderboard = (
  initialLeaderboard: Array<A.CurrentReelRaceInfoQuery_reelRaces_leaderboard>
): Action => ({
  type: "RR/INITIALIZE_LEADERBOARD",
  initialLeaderboard,
});

export const updateLeaderboard = (leaderboard: LeaderboardUpdate): Action => ({
  type: "RR/UPDATE_LEADERBOARD",
  leaderboard,
});
