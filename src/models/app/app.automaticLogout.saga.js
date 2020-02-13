// @flow
import { type Saga, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { waitForSelector, navigateToRootWithReload } from "Utils";

export function* appAutomaticLogoutSaga(): Saga {
  yield put(
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT, {
      mustAccept: true,
    })
  );

  yield delay(200);

  yield call(waitForSelector, isModalHiddenSelector);

  yield call(navigateToRootWithReload);
}
