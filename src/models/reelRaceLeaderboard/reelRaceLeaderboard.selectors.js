// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";

export const reelRaceLeaderboardSelector = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.LEADERBOARD]),
  R.identity
);
