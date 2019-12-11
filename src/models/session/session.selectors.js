// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { ENTITY_KEYS } from "Models/schema";

export const playerSessionIsValidSelector: any => boolean = createSelector(
  R.path([ENTITY_KEYS.PLAYER_SESSION, "valid"]),
  R.identity
);
