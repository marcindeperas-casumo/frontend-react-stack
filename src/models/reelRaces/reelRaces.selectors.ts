// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";
import type { CometdLeaderboard } from "./reelRaces.types";

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, any, (res1: unknown, res... Remove this comment to see the full error message
const userLeaderboardSelector: () => CometdLeaderboard = createSelector(
  playerIdSelector,
  R.pathOr({}, ["reelRaces", "leaderboard"]),
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
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

export function useGameActivityAwareLeaderboard() {
  const leaderboardOrder = useSelector(R.path(["reelRaces", "order"]));
  const leaderboardObj = useSelector(R.path(["reelRaces", "leaderboard"]));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type 'unknown'.
  const leaderboard = leaderboardOrder.map(x => leaderboardObj[x]);
  const sorted = R.sortBy(R.prop("position"))(leaderboard);

  return useGameActivityAwareValue(sorted);
}
