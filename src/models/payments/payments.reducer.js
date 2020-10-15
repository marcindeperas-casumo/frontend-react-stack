//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./payments.constants";
import type { SetQuickDepositMethodReturnType } from "./payments.actions";

const DEFAULT_STATE = {
  selectedQuickDepositMethod: null,
  paymentRequest: null,
};

const initialPaymentRequestState = {
  status: null,
  message: null,
};

const handlers = {
  [actionTypes.SET_QUICK_DEPOSIT_METHOD]: (
    state,
    action: SetQuickDepositMethodReturnType
  ) => ({
    ...state,
    selectedQuickDepositMethod: action.payload.method,
  }),
  [actionTypes.START_QUICK_DEPOSIT]: state => ({
    ...state,
    paymentRequest: initialPaymentRequestState,
  }),
  [actionTypes.SET_PAYMENT_REQUEST_STATE]: (state, action) => ({
    ...state,
    paymentRequest: action.payload,
  }),
};

export const paymentsReducer = createReducer<Object>(DEFAULT_STATE, handlers);
