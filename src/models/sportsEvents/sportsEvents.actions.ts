import { types } from "./sportsEvents.constants";
import type { OddsFormatEvent } from "./sportsEvents.types";

export const oddsFormatChangeAction = (data: OddsFormatEvent) => ({
  type: types.ODDS_FORMAT_CHANGE,
  payload: data,
});
