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

  // set loading state
  const { entities: loadingTrue } = yield call(
    normalizeData,
    entitySearch({ loading: true })
  );

  yield put(updateEntity(loadingTrue));

  // if there is no query, clear results list
  if (!q) {
    const { entities: clearResults } = yield call(
      normalizeData,
      entitySearch({ games: [] })
    );

    return yield put(updateEntity(clearResults));
  }

  // fetch query search
  yield put(fetchQuerySearch({ platform, country, q }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
  const { games } = response;

  // no match
  if (!games.length) {
    const { entities: noMatch } = yield call(
      normalizeData,
      entitySearch({ noMatch: true })
    );

    yield put(updateEntity(noMatch));

    return yield call(fetchLatestPlayedSaga);
  }

  // save search results
  const { entities } = yield call(normalizeData, entitySearch({ games }));

  yield put(updateEntity(entities));

  // if direct hit fetch latest played games
  if (games.length === 1) {
    yield call(fetchLatestPlayedSaga);
  }
}
