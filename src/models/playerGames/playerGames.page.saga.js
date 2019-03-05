import { call, put, take, select } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { sessionId as sessionIdSelector } from "Models/handshake";
import {
  fetchPlayerGames,
  getFetchCompleteTypeByPage,
  getPlayerGamesListIdByPage,
} from "Models/playerGames";

export function* fetchPlayerGamesPageSaga({ page, pageSize }) {
  const sessionId = yield select(sessionIdSelector);

  yield put(fetchPlayerGames({ page, pageSize, sessionId }));

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
