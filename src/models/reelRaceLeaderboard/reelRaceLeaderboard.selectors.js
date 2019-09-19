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
  state => state,
  playerIdSelector,
  (state, playerId) =>
    R.pipe(
      R.pathOr({}, ["schema", ENTITY_KEYS.LEADERBOARD]),
      R.prop(playerId),
      R.prop("remainingSpins"),
      R.defaultTo(null)
    )(state)
);

export const reelRacePlayerBoostersSelector = createSelector(
  state => state,
  playerIdSelector,
  (state, playerId) => {
    return R.pipe(
      R.pathOr({}, ["schema", ENTITY_KEYS.LEADERBOARD]),
      R.prop(playerId),
      R.prop("boosters"),
      R.defaultTo(null)
    )(state);
  }
);
