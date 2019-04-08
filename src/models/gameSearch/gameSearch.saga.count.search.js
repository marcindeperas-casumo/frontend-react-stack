import { put, select } from "redux-saga/effects";
import {
  initFetchGameSearchPage,
  fetchGameSearchCount,
  clearSearch,
} from "Models/gameSearch";
import { sessionIdSelector } from "Models/handshake";

export function* gameSearchCountSaga(action) {
  const { query } = action;

  // if there is no query or just spaces, stop here
  if (!query || !query.replace(/\s/g, "").length) {
    yield put(clearSearch());

    return;
  }

  const sessionId = yield select(sessionIdSelector);

  yield put(fetchGameSearchCount({ sessionId, query }));

  yield put(initFetchGameSearchPage({ startIndex: 0, pageSize: 40, query }));
}
