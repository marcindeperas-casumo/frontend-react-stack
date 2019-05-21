import { head } from "ramda";
import { call, put, take, select } from "redux-saga/effects";
import {
  fetchGameSearch,
  fetchLatestPlayedSaga,
  clearSearchResultsSaga,
  getSearchFetchCompleteTypeByPage,
  fetchSuggestedGamesSaga,
  getgameSearchListIdByPage,
} from "Models/gameSearch";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { sessionIdSelector } from "Models/handshake";

export function* fetchGameSearchPageSaga({ startIndex, pageSize, query }) {
  const sessionId = yield select(sessionIdSelector);

  const page = Math.ceil(startIndex / pageSize);

  if (!page) {
    yield call(clearSearchResultsSaga);
  }

  // fetch query search
  yield put(fetchGameSearch({ sessionId, query, page, pageSize }));

  const { response } = yield take(
    getSearchFetchCompleteTypeByPage(query, page)
  );

  // save search results
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: getgameSearchListIdByPage(page),
      games: response,
    },
  });

  yield put(updateEntity(entities));

  const isNoMatch = response.length === 0;
  const isDirectMatch = response.length === 1;

  if (isNoMatch) {
    yield call(fetchLatestPlayedSaga);
  }

  if (isDirectMatch) {
    yield call(fetchSuggestedGamesSaga, head(response));
  }
}
