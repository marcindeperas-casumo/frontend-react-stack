// @flow
import { type Saga, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { setPlayerLogoutStarted } from "Models/player";
import { REACT_APP_MODAL } from "Src/constants";
import { waitForSelector, navigateToRootWithReload } from "Utils";

export function* appAutomaticLogoutSaga(): Saga {
  yield put(setPlayerLogoutStarted());

  yield put(
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT, {
      mustAccept: true,
    })
  );

  // let the store update and modal show just to be sure next check blocks
  // until modal is approved
  yield delay(1);

  yield call(waitForSelector, isModalHiddenSelector);

  yield call(navigateToRootWithReload);
}
