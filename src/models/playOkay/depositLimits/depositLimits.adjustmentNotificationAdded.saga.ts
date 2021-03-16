import { delay } from "redux-saga";
import { put, PutEffect } from "redux-saga/effects";
import * as actions from "./depositLimits.actions";

type TStoreAction =
  | typeof actions.getAllLimits
  | typeof actions.limitPreadjust
  | typeof actions.getRemainingLimits
  | ReturnType<typeof actions.getLimitsHistory>;
export type TAction = {
  data: {
    notificationAdded: {
      type:
        | "DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_APPROVED"
        | "DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_REJECTED"
        | string;
    };
  };
};

export function* adjustmentNotificationAddedSaga(
  action: TAction
): Generator<PutEffect<TStoreAction> | Promise<boolean>> {
  if (
    ![
      "DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_APPROVED",
      "DGOJ_DEPOSIT_LIMIT_ADJUSTMENT_REJECTED",
    ].includes(action.data.notificationAdded.type)
  ) {
    return;
  }

  yield delay(5000);

  yield put(actions.getAllLimits);
  yield put(actions.limitPreadjust);
  yield put(actions.getRemainingLimits);
  yield put(actions.getLimitsHistory());
}
