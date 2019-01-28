import { call, put, take } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  types,
  PLAYER_ALL_GAMES_LIST_ID,
  fetchPlayerGames,
} from "Models/gameSearch";

export function* fetchPlayerGamesSaga() {
  yield put(fetchPlayerGames());

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE
  );

  const gameList = { id: PLAYER_ALL_GAMES_LIST_ID, games: response };
  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));
}
