import { call, put, take, select } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchPlayerGames,
  isPlayerGamesPageLoaded,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = Math.ceil(startIndex / pageSize);
  const pageLoaded = yield select(isPlayerGamesPageLoaded(page));

  if (pageLoaded) {
    return;
  }

  yield put(fetchPlayerGames({ page, pageSize }));

  const { response } = yield take(getFetchCompleteTypeByPage(page));

  const gameList = {
    id: getPlayerGamesListIdByPage(page),
    games: response,
  };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
