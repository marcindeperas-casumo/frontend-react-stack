import { delay } from "redux-saga";
import { put, PutEffect } from "redux-saga/effects";
import * as actions from "./depositLimits.actions";
import { cometdNotificationAddedTypes } from "./depositLimits.constants";
import type { TCometdNotificationAddedType } from "./depositLimits.types";

type TStoreAction =
  | typeof actions.getAllLimits
  | typeof actions.limitPreadjust
  | typeof actions.getRemainingLimits
  | ReturnType<typeof actions.getLimitsHistory>;
export type TAction = {
  data: {
    notificationAdded: {
      type: TCometdNotificationAddedType | string;
    };
  };
};

export function* adjustmentNotificationAddedSaga(
  action: TAction
): Generator<PutEffect<TStoreAction> | Promise<boolean>> {
  if (
    !Object.values(cometdNotificationAddedTypes).includes(
      action.data.notificationAdded.type
    )
  ) {
    return;
  }

  yield delay(5000);

  yield put(actions.getAllLimits);
  yield put(actions.limitPreadjust);
  yield put(actions.getRemainingLimits);
  yield put(actions.getLimitsHistory());
}
