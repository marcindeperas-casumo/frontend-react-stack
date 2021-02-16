// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { playerIdSelector } from "Models/handshake";
import type { CometdLeaderboard } from "./reelRaces.types";

// those are useSelector diff functions, true means data didn't change

export const userLeaderboardSelector: () => CometdLeaderboard = createSelector(
  playerIdSelector,
  R.pathOr({}, ["reelRaces", "leaderboard"]),
  (playerId, leaderboard) => leaderboard[playerId]
);

export function diffIconLeaderboard(
  left: CometdLeaderboard,
  right: CometdLeaderboard
) {
  return !["remainingSpins", "points", "position"].some(
    x => left[x] !== right[x]
  );
}

export function diffLeaderboardWidget(
  left: CometdLeaderboard,
  right: CometdLeaderboard
) {
  if (
    ["remainingSpins", "points", "position"].some(x => left[x] !== right[x])
  ) {
    return false;
  }

  return !["winsInARow", "bigWins", "megaWins"].some(
    x => left.boosters[x] !== right.boosters[x]
  );
}
