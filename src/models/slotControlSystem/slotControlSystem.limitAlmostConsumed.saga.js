// @flow
import { type Saga } from "redux-saga";
import { put } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { ACTION_TYPES } from "Models/slotControlSystem";
import stats from "Models/slotControlSystem/__mocks__/gameplayStats.mock";

export function* limitAlmostConsumedSaga(): Saga<void> {
  yield put({
    type: ACTION_TYPES.UPDATE_SESSION,
    response: {
      activeSession: null,
      //     activeExclusion: {
      //       id: "123-456-789",
      // expiringTime: Date.now() + 110000,
      // startedTime: Date.now() - 10000,
      //     },
      lastEndedSession: {
        id: "23423234",
        /** Unix time in millis */
        startedTime: Date.now() - 10000,
        /** Unix time in millis */
        endedTime: Date.now(),
        endReason: "LIMIT_REACHED",
        stats,
      },
    },
  });
  yield put(
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED)
  );
}
