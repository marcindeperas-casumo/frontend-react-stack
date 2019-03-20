import { head } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import { countrySelector } from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchLatestPlayedSaga,
  fetchQuerySearch,
  clearSearch,
  getSearchFetchCompleteType,
  fetchSuggestedGamesSaga,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

export function* gameSearchSaga(action) {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const { query } = action;

  // if there is no query or just spaces, stop here
  if (!query || !query.replace(/\s/g, "").length) {
    yield put(clearSearch());

    return;
  }

  // fetch query search
  yield put(fetchQuerySearch({ platform, country, query }));

  const { response } = yield take(getSearchFetchCompleteType(query));

  // save search results
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: GAME_LIST_IDS.GAME_SEARCH,
      games: response.games,
    },
  });

  yield put(updateEntity(entities));

  const isNoMatch = response.games.length === 0;
  const isDirectMatch = response.games.length === 1;

  if (isNoMatch) {
    yield call(fetchLatestPlayedSaga);
  }

  if (isDirectMatch) {
    yield call(fetchSuggestedGamesSaga, head(response.games));
  }
}
