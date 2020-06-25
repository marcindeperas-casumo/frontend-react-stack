// @flow
import { type Saga } from "redux-saga";
import { put, select, call } from "redux-saga/effects";
import { showModal, isModalOpenSelector } from "Models/modal";
import { jurisdictionSelector } from "Models/handshake";
import { REACT_APP_MODAL, JURISDICTIONS } from "Src/constants";
import { waitForSelector } from "Utils";

export function* periodicNotificationSaga(): Saga {
  yield call(waitForSelector, jurisdictionSelector);

  const jurisdiction = yield select(jurisdictionSelector);

  if (jurisdiction !== JURISDICTIONS.SGA) {
    return;
  }

  const isModalOpen = yield select(isModalOpenSelector);

  if (isModalOpen) {
    return;
  }

  yield put(showModal(REACT_APP_MODAL.ID.REALITY_CHECK));
}
