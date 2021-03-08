import * as A from "Types/apollo";
import type { CometdLeaderboard } from "./reelRaces.types";

type LeaderboardUpdate = {
  [s: string]: CometdLeaderboard;
};

export type Action =
  | {
      type: "RR/INITIALIZE_LEADERBOARD";
      initialLeaderboard: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"];
    }
  | {
      type: "RR/UPDATE_LEADERBOARD";
      leaderboard: LeaderboardUpdate;
    };

export const initializeLeaderboard = (
  initialLeaderboard: A.CurrentReelRaceInfoQuery["reelRaces"][number]["leaderboard"]
): Action => ({
  type: "RR/INITIALIZE_LEADERBOARD",
  initialLeaderboard,
});

export const updateLeaderboard = (leaderboard: LeaderboardUpdate): Action => ({
  type: "RR/UPDATE_LEADERBOARD",
  leaderboard,
});
