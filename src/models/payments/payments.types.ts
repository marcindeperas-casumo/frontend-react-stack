import type { QuickDepositMethod } from "Models/payments";
import {
  actionTypes,
  requestState,
  requestStateMessageType,
} from "./payments.constants";

export type ActionTypes = ValueOf<typeof actionTypes>;

export type DepositRequestStateType = {
  state: ValueOf<typeof requestState>;
  message?: {
    type: ValueOf<typeof requestStateMessageType>;
    code?: string;
  };
};

export type SetQuickDepositMethodReturnType = {
  payload: {
    method: QuickDepositMethod | undefined;
  };
  type: ActionTypes;
};

export type StartQuickDepositActionReturnType = {
  payload: {
    cvvEncoded: string;
    amount: number;
    paymentMethod: QuickDepositMethod;
  };
  type: ActionTypes;
};

export type SetPaymentRequestReturnType = {
  payload: DepositRequestStateType;
  type: ActionTypes;
};
