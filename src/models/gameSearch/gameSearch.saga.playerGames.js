import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  types,
  listTypes,
  fetchPlayerGames,
  updateStartIndex,
} from "Models/gameSearch";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = Math.ceil(startIndex / pageSize);

  yield put(fetchPlayerGames({ page, pageSize }));

  const { response } = yield take(
    `${types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE}_PAGE${page}`
  );

  const gameList = {
    id: `${listTypes.PLAYER_GAMES}Page${page}`,
    games: response,
  };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateStartIndex(startIndex));

  yield put(updateEntity(entities));
}
