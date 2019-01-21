import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { fetchGameSearch } from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

export function* fetchGameSearchQuerySaga(action) {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const { q } = action;

  if (q) {
    yield put(
      fetchGameSearch({
        platform,
        country,
        q,
      })
    );

    const { response } = yield take(types.GAME_SEARCH_FETCH_COMPLETE);
    const { games } = response;
    const gameList = { id: "gameSearchResults", games };
    const { entities } = yield call(normalizeData, { gameList });
    return yield put(updateEntity(entities));
  }

  const gameList = { id: "gameSearchResults", games: [] };
  const { entities } = yield call(normalizeData, { gameList });
  return yield put(updateEntity(entities));
}
