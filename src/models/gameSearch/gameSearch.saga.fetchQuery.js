import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { fetchQuerySearch } from "./gameSearch.actions";
import { fetchLatestPlayedSaga } from "./gameSearch.saga.latestPlayed";
import { types } from "./gameSearch.constants";

const entitySearch = ({ loading = false, noMatch = false, games }) => ({
  [ENTITY_KEYS.GAME_LIST]: {
    id: "gameSearch",
    loading,
    noMatch,
    games,
  },
});

export function* fetchQuerySaga(action) {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const { q } = action;

  const loading = yield call(normalizeData, entitySearch({ loading: true }));
  yield put(updateEntity(loading.entities));

  if (!q) {
    const notLoading = yield call(normalizeData, entitySearch({ games: [] }));

    return yield put(updateEntity(notLoading.entities));
  }

  yield put(fetchQuerySearch({ platform, country, q }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
  const { games } = response;

  // no results!
  if (!games.length) {
    const noMatchEntity = yield call(
      normalizeData,
      entitySearch({ noMatch: true })
    );
    yield put(updateEntity(noMatchEntity.entities));
    return yield call(fetchLatestPlayedSaga);
  }

  const { entities } = yield call(normalizeData, entitySearch({ games }));
  yield put(updateEntity(entities));

  // direct hit
  if (games.length === 1) {
    yield call(fetchLatestPlayedSaga);
  }
}
