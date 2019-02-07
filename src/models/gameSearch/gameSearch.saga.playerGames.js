import { call, put, take, select } from "redux-saga/effects";
import { ENTITY_KEYS, normalizeData, updateEntity } from "Models/schema";
import {
  types,
  listTypes,
  fetchPlayerGames,
  updateStartIndex,
  playerGamesSelector,
} from "Models/gameSearch";
import { insertAll } from "ramda";

export function* fetchPlayerGamesSaga(action) {
  const { startIndex, pageSize } = action;

  const page = Math.ceil(startIndex / pageSize);

  yield put(fetchPlayerGames({ page }));

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE
  );

  const loadedGames = yield select(playerGamesSelector);

  const gameList = {
    id: listTypes.PLAYER_GAMES,
    games: insertAll(startIndex, response, loadedGames),
  };

  const { entities } = yield call(normalizeData, {
    [ENTITY_KEYS.GAME_LIST]: gameList,
  });

  yield put(updateEntity(entities));

  yield put(updateStartIndex(startIndex));
}
