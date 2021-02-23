//@flow
import { combineReducers } from "redux";
//this one comes from the old playOkay (for DK only for now)
import { playOkayReducer as playOkay } from "./playOkay.reducer";
import { depositLimitsReducer } from "./depositLimits/depositLimits.reducer";
// @ts-expect-error ts-migrate(2459) FIXME: Module '"./playOkay.types"' declares 'type' locall... Remove this comment to see the full error message
import { type PlayOkayRootReduxStore } from "./playOkay.types";

export const playOkayReducer = combineReducers<PlayOkayRootReduxStore>({
  depositLimits: depositLimitsReducer,
  playOkay,
});
