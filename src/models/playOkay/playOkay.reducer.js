//@flow
import { combineReducers } from "redux";
//this one comes from the old playOkay (for DK only for now)
import { playOkayReducer as playOkay } from "../compliance/denmark/playOkay.reducer";
import { depositLimitsReducer } from "./depositLimits/depositLimits.reducer";

export const playOkayReducer = combineReducers({
  depositLimits: depositLimitsReducer,
  playOkay,
});
