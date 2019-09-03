// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { ENTITY_KEYS } from "Models/schema";
import type { Playing } from "./playing.types";

export const playingSelector: () => Playing = createSelector(
  R.prop(ENTITY_KEYS.PLAYING)
);
