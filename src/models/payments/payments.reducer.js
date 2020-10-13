//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./payments.constants";
import type { SetQuickDepositMethodReturnType } from "./payments.actions";

const DEFAULT_STATE = {
  selectedQuickDepositMethod: null,
  newPaymentRequest: null,
};

const initialPaymentRequestState = {
  isProcessing: false,
  piqResult: null,
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
    newPaymentRequest: initialPaymentRequestState,
  }),
  [actionTypes.SET_PROCESSING_PAYMENT_USAGE]: (state, action) => ({
    ...state,
    newPaymentRequest: {
      ...state.newPaymentRequest,
      isProcessing: action.payload.state,
    },
  }),
  [actionTypes.SET_PAYMENT_PIQ_RESULT]: (state, action) => ({
    ...state,
    newPaymentRequest: {
      ...state.newPaymentRequest,
      piqResult: action.payload.result,
    },
  }),
};

export const paymentsReducer = createReducer<Object>(DEFAULT_STATE, handlers);
