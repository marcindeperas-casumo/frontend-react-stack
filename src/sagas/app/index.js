import { fetchTopLists } from "Reducers/games/actions";
import { fetchHandshake } from "Reducers/handshake/actions";
import { isAuthenticated } from "Reducers/handshake/selectors";
import { call, put, select, take } from "redux-saga/effects";

function* waitForSelector(selector) {
  if (yield select(selector)) {
    return;
  }
  while (true) {
    yield take("*");
    if (yield select(selector)) {
      return;
    }
  }
}

export function* appSaga() {
  yield put(fetchHandshake());
  yield call(waitForSelector, isAuthenticated);
  yield put(fetchTopLists());
}

export default appSaga;
