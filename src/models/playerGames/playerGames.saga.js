import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import { types, fetchPlayerGames } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = yield Math.ceil(startIndex / pageSize);

  yield put(fetchPlayerGames({ page, pageSize }));

  const { response } = yield take(
    `${types.PLAYER_GAMES_FETCH_COMPLETE}_PAGE${page}`
  );

  const gameList = {
    id: `${GAME_LIST_IDS.PLAYER_GAMES}Page${page}`,
    games: response,
  };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
