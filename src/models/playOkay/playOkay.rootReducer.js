//@flow
import { combineReducers } from "redux";
//this one comes from the old playOkay (for DK only for now)
import { playOkayReducer as playOkay } from "./playOkay.reducer";
import { depositLimitsReducer } from "./depositLimits/depositLimits.reducer";
import { type PlayOkayRootReduxStore } from "./playOkay.types";

export const playOkayReducer = combineReducers<PlayOkayRootReduxStore>({
  depositLimits: depositLimitsReducer,
  playOkay,
});
