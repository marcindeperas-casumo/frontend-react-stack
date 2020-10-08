//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./payments.constants";

const DEFAULT_STATE = {
  selectedQuickDepositMethod: null,
};

const handlers = {
  [actionTypes.SET_QUICK_DEPOSIT_METHOD]: (state, action) => ({
    ...state,
    selectedQuickDepositMethod: action.method,
  }),
};

export const methodConfigReducer = createReducer<Object>(
  DEFAULT_STATE,
  handlers
);
