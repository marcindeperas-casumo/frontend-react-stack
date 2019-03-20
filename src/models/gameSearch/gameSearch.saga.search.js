import { call, put, select, take } from "redux-saga/effects";
import { sessionIdSelector } from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchLatestPlayedSaga,
  fetchQuerySearch,
  clearSearch,
  getSearchFetchCompleteType,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export function* gameSearchSaga(action) {
  const sessionId = yield select(sessionIdSelector);
  const { query } = action;

  // if there is no query or just spaces, stop here
  if (!query || !query.replace(/\s/g, "").length) {
    yield put(clearSearch());

    return;
  }

  // fetch query search
  yield put(fetchQuerySearch({ sessionId, query }));

  const { response } = yield take(getSearchFetchCompleteType(query));

  // save search results
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.GAME_SEARCH,
      games: response,
    },
  });

  yield put(updateEntity(entities));

  // if no match or direct hit fetch latest played games
  if (response.length <= 1) {
    yield call(fetchLatestPlayedSaga);
  }
}
