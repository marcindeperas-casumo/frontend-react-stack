//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./payments.constants";
import type { SetQuickDepositMethodReturnType } from "./payments.actions";

const DEFAULT_STATE = {
  selectedQuickDepositMethod: null,
};

const handlers = {
  [actionTypes.SET_QUICK_DEPOSIT_METHOD]: (
    state,
    action: SetQuickDepositMethodReturnType
  ) => ({
    ...state,
    selectedQuickDepositMethod: action.payload.method,
  }),
};

export const paymentsReducer = createReducer<Object>(DEFAULT_STATE, handlers);
