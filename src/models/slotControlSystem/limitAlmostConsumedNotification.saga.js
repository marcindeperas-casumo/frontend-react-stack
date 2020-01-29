// @flow
import * as R from "ramda";
import { put } from "redux-saga/effects";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { showModal } from "Models/modal";

export function* limitAlmostConsumedNotificationSaga(action: any): any {
  const config = R.path(
    ["data", cometdMessages.LIMIT_ALMOST_CONSUMED_NOTIFICATION],
    action
  );

  yield put(
    showModal("SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION", config)
  );
}
