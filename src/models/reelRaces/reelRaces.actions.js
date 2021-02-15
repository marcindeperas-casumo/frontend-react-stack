// @flow
import * as A from "Types/apollo";
import type { CometdLeaderboard } from "./reelRaces.types";

type LeaderboardUpdate = {
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
