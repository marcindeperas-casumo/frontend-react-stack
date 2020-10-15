//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./payments.constants";
import type { SetQuickDepositMethodReturnType } from "./payments.actions";

const initialPaymentRequestState = {
  status: null,
  message: null,
};

const DEFAULT_STATE = {
  selectedQuickDepositMethod: null,
  paymentRequest: initialPaymentRequestState,
};

const handlers = {
  [actionTypes.SET_QUICK_DEPOSIT_METHOD]: (
    state,
    action: SetQuickDepositMethodReturnType
  ) => ({
    ...state,
    selectedQuickDepositMethod: action.payload.method,
  }),
  [actionTypes.SET_PAYMENT_REQUEST_STATE]: (state, action) => ({
    ...state,
    paymentRequest: action.payload,
  }),
};

export const paymentsReducer = createReducer<Object>(DEFAULT_STATE, handlers);
