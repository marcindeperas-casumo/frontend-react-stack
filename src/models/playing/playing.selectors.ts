import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import type { Playing } from "./playing.types";

// @ts-expect-error: apply fix if you know the context
export const playingSelector = createSelector<any, Playing, Playing>(
  R.prop(ENTITY_KEYS.PLAYING),
  R.identity
);
