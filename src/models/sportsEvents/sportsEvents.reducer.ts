import { tryCatch } from "ramda";
import { createReducer } from "Utils";
import { LOCAL_STORAGE_USER_SETTINGS, types } from "./sportsEvents.constants";

const DEFAULT_STATE = {
  oddsFormat: tryCatch(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_SETTINGS))?.oddsFormat,
    () => "decimal"
  )(),
};

const handlers = {
  [types.ODDS_FORMAT_CHANGE]: (prevState, action) => ({
    ...prevState,
    oddsFormat: action.payload.oddsFormat,
  }),
};

export const sportsEventsReducer = createReducer(DEFAULT_STATE, handlers);
