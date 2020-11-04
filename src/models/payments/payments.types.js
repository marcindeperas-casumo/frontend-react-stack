// @flow
import { type QuickDepositMethod } from "Models/payments";
import {
  actionTypes,
  requestState,
  requestStateMessageType,
} from "./payments.constants";

export type ActionTypes = $Values<typeof actionTypes>;

export type DepositRequestStateType = {
  state: $Values<typeof requestState>,
  message?: {
    type: $Values<typeof requestStateMessageType>,
    code?: string,
  },
};

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
