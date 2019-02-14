import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchPlayerGames,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = yield Math.ceil(startIndex / pageSize);

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
