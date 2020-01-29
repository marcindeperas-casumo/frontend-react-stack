// @flow
import { type Saga } from "redux-saga";
import { put } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import {
  ACTION_TYPES,
  type SessionEndedCometdMessage,
} from "Models/slotControlSystem";

export function* sessionEndedSaga(
  message: SessionEndedCometdMessage
): Saga<void> {
  yield put({
    type: ACTION_TYPES.UPDATE_SESSION,
    response: {
      activeSession: null,
      lastEndedSession:
        message.data[
          "com.casumo.es.slotsessions.notifications.SessionEndedNotification"
        ],
    },
  });
  yield put(
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED, {
      mustAccept: true,
    })
  );
}
