import { call, put, select, take } from "redux-saga/effects";
import { country as countrySelector } from "Models/handshake";
import { normalizeData, updateEntity } from "Models/schema";
import { fetchGameListAllGames } from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

export function* fetchGameSearchListSaga() {
  const platform = "mobile";
  const country = yield select(countrySelector);
  const id = "allGames";
  const page = null;
  const pageSize = null;

  yield put(fetchGameListAllGames({ platform, country, id, page, pageSize }));

  const { response } = yield take(types.GAME_SEARCH_FETCH_ALL_GAMES_COMPLETE);

  const gameList = { id: "allGames", games: response };
  const { entities } = yield call(normalizeData, { gameList });

  yield put(updateEntity(entities));
}
