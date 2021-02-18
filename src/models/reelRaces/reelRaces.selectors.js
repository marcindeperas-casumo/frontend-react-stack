// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";
import type { CometdLeaderboard } from "./reelRaces.types";

const userLeaderboardSelector: () => CometdLeaderboard = createSelector(
  playerIdSelector,
  R.pathOr({}, ["reelRaces", "leaderboard"]),
  (playerId, leaderboard) => leaderboard[playerId]
);

// those are useSelector diff functions, true means data didn't change
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

// updates only when data used on profile icon changes
export function useGameActivityAwareIconLeaderboard() {
  const userLeaderboard = useSelector(
    userLeaderboardSelector,
    diffIconLeaderboard
  );

  return useGameActivityAwareValue(userLeaderboard);
}

// updates only when data used on profile icon or drawer widget changes
export function useGameActivityAwareWidgetLeaderboard() {
  const userLeaderboard = useSelector(
    userLeaderboardSelector,
    diffLeaderboardWidget
  );

  return useGameActivityAwareValue(userLeaderboard);
}
