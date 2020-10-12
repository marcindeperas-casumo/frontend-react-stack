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

export const setQuickDepositMethod = (
  method: ?QuickDepositMethod
): SetQuickDepositMethodReturnType => ({
  type: actionTypes.SET_QUICK_DEPOSIT_METHOD,
  payload: {
    method,
  },
});
