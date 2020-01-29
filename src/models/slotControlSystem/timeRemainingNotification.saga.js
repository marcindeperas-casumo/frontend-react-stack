// @flow
import * as R from "ramda";
import { put } from "redux-saga/effects";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { showModal } from "Models/modal";

export function* timeRemainingNotificationSaga(action: any): any {
  const config = R.path(
    ["data", cometdMessages.TIME_REMAINING_NOTIFICATION],
    action
  );

  yield put(
    showModal("SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION", config)
  );
}
