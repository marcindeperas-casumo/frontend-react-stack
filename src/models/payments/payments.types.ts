// @flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"."' has no exported member 'type'.
import { type QuickDepositMethod } from "Models/payments";
import {
  actionTypes,
  requestState,
  requestStateMessageType,
} from "./payments.constants";

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type ActionTypes = $Values<typeof actionTypes>;

export type DepositRequestStateType = {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
  state: $Values<typeof requestState>,
  message?: {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
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
