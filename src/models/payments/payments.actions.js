// @flow
import { actionTypes, requestState } from "./payments.constants";
import type {
  SetQuickDepositMethodReturnType,
  StartQuickDepositActionReturnType,
  SetPaymentRequestReturnType,
} from "./payments.types";
import type { QuickDepositMethod } from "./methodConfig.types";

export const setQuickDepositMethod = (
  method: ?QuickDepositMethod
): SetQuickDepositMethodReturnType => ({
  type: actionTypes.SET_QUICK_DEPOSIT_METHOD,
  payload: {
    method,
  },
});

export const startQuickDeposit = ({
  cvvEncoded,
  amount,
  paymentMethod,
}: {
  cvvEncoded: string,
  amount: number,
  paymentMethod: QuickDepositMethod,
}): StartQuickDepositActionReturnType => ({
  type: actionTypes.START_QUICK_DEPOSIT,
  payload: {
    cvvEncoded,
    amount,
    paymentMethod,
  },
});

export const setPaymentRequestProcessing = (): SetPaymentRequestReturnType => ({
  type: actionTypes.SET_PAYMENT_REQUEST_STATE,
  payload: {
    state: requestState.PROCESSING,
  },
});

export const setPaymentRequestFinished = (): SetPaymentRequestReturnType => ({
  type: actionTypes.SET_PAYMENT_REQUEST_STATE,
  payload: {
    state: requestState.NONE,
  },
});

export const piqIframeResolve = (message: {
  status: string,
  txId?: string,
}) => ({
  type: actionTypes.PIQ_IFRAME_RESOLVE,
  payload: {
    ...message,
  },
});

export const methodUseSuccess = (message: { amount: number }) => ({
  type: actionTypes.PAYMENT_USE_SUCCESS,
  payload: {
    ...message,
  },
});

export const methodUseError = (message: { amount: number }) => ({
  type: actionTypes.PAYMENT_USE_ERROR,
  payload: {
    ...message,
  },
});
