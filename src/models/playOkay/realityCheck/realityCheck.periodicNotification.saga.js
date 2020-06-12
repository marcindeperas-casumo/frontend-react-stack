// @flow
import { type Saga } from "redux-saga";
import { put } from "redux-saga/effects";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";

export function* periodicNotificationSaga(): Saga {
  yield put(showModal(REACT_APP_MODAL.ID.REALITY_CHECK));
}
