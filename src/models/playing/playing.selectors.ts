import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";

export const playingSelector = createSelector(
  R.prop(ENTITY_KEYS.PLAYING),
  R.identity
);
