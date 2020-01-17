// @flow
import * as R from "ramda";
import { put } from "redux-saga/effects";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { showModal } from "Models/modal";

export function* periodicReminderNotificationSaga(action: any): any {
  const config = R.path(
    ["data", cometdMessages.PERIODIC_REMINDER_NOTIFICATION],
    action
  );

  yield put(
    showModal("SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION", config)
  );
}
