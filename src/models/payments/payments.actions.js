// @flow
import {
  actionTypes,
  requestState,
  requestStateMessageType,
} from "./payments.constants";
import type { QuickDepositMethod } from "./methodConfig.types";
import type { ActionTypes, DepositRequestStateType } from "./payments.types";

export type SetQuickDepositMethodReturnType = {
  payload: {
    method: ?QuickDepositMethod,
  },
  type: ActionTypes,
};

export type StartQuickDepositActionReturnType = {
  payload: {
    cvvEncoded: string,
    amount: number,
    paymentMethod: QuickDepositMethod,
  },
  type: ActionTypes,
};

export type SetPaymentRequestReturnType = {
  payload: DepositRequestStateType,
  type: ActionTypes,
};

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

export const setPaymentRequestSuccess = (): SetPaymentRequestReturnType => ({
  type: actionTypes.SET_PAYMENT_REQUEST_STATE,
  payload: {
    state: requestState.FINISHED,
    message: {
      type: requestStateMessageType.SUCCESS,
    },
  },
});

export const setPaymentRequestError = (
  errorCode: string
): SetPaymentRequestReturnType => ({
  type: actionTypes.SET_PAYMENT_REQUEST_STATE,
  payload: {
    state: requestState.FINISHED,
    message: {
      type: requestStateMessageType.ERROR,
      code: errorCode,
    },
  },
});
