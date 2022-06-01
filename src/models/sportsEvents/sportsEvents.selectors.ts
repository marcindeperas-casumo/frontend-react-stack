import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import { OddsFormatEvent } from "./sportsEvents.types";

export const oddsFormatSelector = createSelector<
  // @ts-expect-error: apply fix if you know the context
  any,
  OddsFormatEvent,
  OddsFormatEvent
>(R.prop(ENTITY_KEYS.SPORTS_EVENTS), R.identity);
