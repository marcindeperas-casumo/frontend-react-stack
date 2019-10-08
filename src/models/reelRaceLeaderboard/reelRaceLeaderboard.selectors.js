// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { playerIdSelector } from "Models/handshake";
import { ENTITY_KEYS } from "Models/schema";

export const reelRaceLeaderboardSelector = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.LEADERBOARD]),
  R.identity
);

export const reelRacePlayerSpinsSelector = createSelector(
  reelRaceLeaderboardSelector,
  playerIdSelector,
  (board, playerId) => R.pathOr(null, [playerId, "remainingSpins"], board)
);

export const reelRacePlayerBoostersSelector = createSelector(
  reelRaceLeaderboardSelector,
  playerIdSelector,
  (board, playerId) => R.pathOr(null, [playerId, "boosters"], board)
);
