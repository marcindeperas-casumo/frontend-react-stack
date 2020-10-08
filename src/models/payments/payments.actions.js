// @flow
import { actionTypes } from "./payments.constants";
import type { QuickDepositMethod } from "./methodConfig.types";
import type { ActionTypes } from "./payments.types";

type SetQuickDepositMethodReturnType = {
  method: ?QuickDepositMethod,
  type: ActionTypes,
};

export const setQuickDepositMethod = (
  method: ?QuickDepositMethod
): SetQuickDepositMethodReturnType => ({
  type: actionTypes.SET_QUICK_DEPOSIT_METHOD,
  method,
});
