// @flow
// @ts-expect-error ts-migrate(2614) FIXME: Module '"../../../node_modules/redux-saga"' has no... Remove this comment to see the full error message
import { type Saga, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { logout as logoutAction } from "Models/app";
import { setPlayerLogoutStarted } from "Models/player";
import { showModal, isModalHiddenSelector } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { waitForSelector, navigateToRootWithReload } from "Utils";

export function* appManualLogoutSaga(): Saga {
  yield put(setPlayerLogoutStarted());

  yield put(
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT, {
      mustAccept: true,
    })
  );

  // let the store update and modal show just to be sure next check blocks
  // until modal is approved
  yield delay(1);

  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield call(waitForSelector, isModalHiddenSelector);

  yield put(logoutAction());

  yield delay(400);

  yield call(navigateToRootWithReload);
}
