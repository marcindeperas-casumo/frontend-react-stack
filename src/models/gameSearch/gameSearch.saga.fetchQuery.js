import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import {
  types,
  fetchLatestPlayedSaga,
  fetchQuerySearch,
  gameSearchEntities,
} from "Models/gameSearch";

export function* fetchQuerySaga(action) {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const { q } = action;

  // set loading state
  const { entities: loadingTrueEntities } = yield call(
    normalizeData,
    gameSearchEntities({ loading: true, query: q })
  );

  yield put(updateEntity(loadingTrueEntities));

  // fetch query search
  yield put(fetchQuerySearch({ platform, country, q }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
  const { games } = response;

  // if no match fetch latest played games
  if (!games.length) {
    const { entities: noMatchEntities } = yield call(
      normalizeData,
      gameSearchEntities({ noMatch: true })
    );

    yield put(updateEntity(noMatchEntities));

    return yield call(fetchLatestPlayedSaga);
  }

  // save search results
  const { entities } = yield call(
    normalizeData,
    gameSearchEntities({ games, query: q })
  );

  yield put(updateEntity(entities));

  // if direct hit fetch latest played games
  if (games.length === 1) {
    return yield call(fetchLatestPlayedSaga);
  }
}
