import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  fetchPlayerGames,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

export function* fetchPlayerGamesPageSaga({ page, pageSize }) {
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
