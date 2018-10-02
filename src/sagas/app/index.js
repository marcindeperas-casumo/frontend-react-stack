import { fetchAppHandshake } from "Reducers/handshake";
import { isAuthenticated } from "Reducers/handshake/selectors";
import { call, fork, put } from "redux-saga/effects";
import { fetchGameListSaga } from "Sagas/games";
import { waitForSelector } from "../utils";

export function* appSaga() {
  // Once the app starts, we start off by dispatching an action to fetch the
  // application handshake
  yield put(fetchAppHandshake());

  // Then we will wait until the isAuthenticated returns true (this ensures that
  // the application handshake is loaded and a logged in session is active).
  // This is under the assumption that the react-stack will only run in logged
  // in mode
  yield call(waitForSelector, isAuthenticated);

  // Once we the application is logged in and have have the handshake in place,
  // we can dispatch an action to kick of another saga that will fetch all the
  // games top lists
  yield fork(fetchGameListSaga);
}

export default appSaga;
