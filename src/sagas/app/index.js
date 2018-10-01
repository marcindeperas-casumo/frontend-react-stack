import { fetchTopLists } from "Reducers/games/actions";
import { fetchHandshake } from "Reducers/handshake/actions";
import { isAuthenticated } from "Reducers/handshake/selectors";
import { call, put } from "redux-saga/effects";
import { waitForSelector } from "../utils";

export function* appSaga() {
  yield put(fetchHandshake());
  yield call(waitForSelector, isAuthenticated);
  yield put(fetchTopLists());
}

export default appSaga;
