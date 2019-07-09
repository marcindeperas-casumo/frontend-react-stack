//@flow
import { combineReducers } from "redux";
import { depositLimitsReducer } from "./depositLimits/depositLimits.reducer";

export const playOkayReducer = combineReducers({
  depositLimits: depositLimitsReducer,
});
