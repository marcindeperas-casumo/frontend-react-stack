import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  types,
  listTypes,
  fetchLatestPlayedSaga,
  clearSearchSaga,
  fetchQuerySearch,
  noResultsAction,
  clearSearch,
} from "Models/gameSearch";

export function* gameSearchSaga(action) {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const { q } = action;

  // if there is no query, stops here
  if (Boolean(!q)) {
    return yield put(clearSearch());
  }

  // fetch query search
  yield put(fetchQuerySearch({ platform, country, q }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
  const { games } = response;

  // if no match fetch latest played games
  if (!games.length) {
    yield put(noResultsAction());

    return yield call(fetchLatestPlayedSaga);
  }

  // save search results
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: {
      id: listTypes.GAME_SEARCH,
      games,
    },
  });

  yield put(updateEntity(entities));

  // if direct hit fetch latest played games
  if (games.length === 1) {
    return yield call(fetchLatestPlayedSaga);
  }

  return true;
}
