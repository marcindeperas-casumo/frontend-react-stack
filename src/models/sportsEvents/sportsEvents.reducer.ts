import { createReducer } from "Utils";
import { types } from "./sportsEvents.constants";

const DEFAULT_STATE = {
  oddsFormat: "decimal",
};

const handlers = {
  [types.ODDS_FORMAT_CHANGE]: (prevState, action) => ({
    ...prevState,
    oddsFormat: action.payload.oddsFormat,
  }),
};

export const sportsEventsReducer = createReducer(DEFAULT_STATE, handlers);
