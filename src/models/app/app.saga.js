import { call, put } from "redux-saga/effects";
import { fetchAppHandshake, isAuthenticated } from "Models/handshake";
import { initFetchActiveSessionAction } from "Models/slotControlSystem";
import { waitForSelector } from "Utils";

export function* appSaga() {
  // Once the app starts, we start off by dispatching an action to fetch the
  // application handshake
  yield put(fetchAppHandshake());

  // Then we will wait until the isAuthenticated returns true (this ensures that
  // the application handshake is loaded and a logged in session is active).
  // This is under the assumption that the react-stack will only run in logged
  // in mode
  yield call(waitForSelector, isAuthenticated);

  yield put(initFetchActiveSessionAction());
}

export default appSaga;
