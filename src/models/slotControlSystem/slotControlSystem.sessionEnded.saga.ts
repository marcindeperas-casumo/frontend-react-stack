// @flow
import { type Saga } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import {
  ACTION_TYPES,
  END_SESSION_REASONS,
  type SessionEndedCometdMessage,
  type EndedSessionType,
  endedSessionSelector,
} from "Models/slotControlSystem";

export function* sessionEndedSaga(
  message: SessionEndedCometdMessage
): Saga<void> {
  yield put({
    type: ACTION_TYPES.UPDATE_SESSION,
    response: {
      ...message.data[
        "com.casumo.es.slotsessions.notifications.SessionEndedNotification"
      ],
    },
  });
  const endedSession: ?EndedSessionType = yield select(endedSessionSelector);

  if (endedSession?.endReason === END_SESSION_REASONS.LOGGED_OUT) {
    // don't show this modal as BEFORE_LOGGING_OUT was already shown
    return;
  }

  yield put(
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED, {
      mustAccept: true,
    })
  );
}
