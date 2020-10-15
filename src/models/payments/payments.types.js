// @flow
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
