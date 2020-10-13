// @flow
import { actionTypes } from "./payments.constants";
import type { QuickDepositMethod } from "./methodConfig.types";
import type { ActionTypes } from "./payments.types";

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

export const setIsProcessingPaymentUsage = (state: boolean) => ({
  type: actionTypes.SET_PROCESSING_PAYMENT_USAGE,
  payload: {
    state,
  },
});

export const setPaymentPiqResult = (result: any) => ({
  type: actionTypes.SET_PAYMENT_PIQ_RESULT,
  payload: {
    result,
  },
});
