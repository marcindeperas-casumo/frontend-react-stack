import { call, put, take } from "redux-saga/effects";
import { normalizeData, updateEntity } from "Models/schema";
import { fetchPlayerGames } from "./gameSearch.actions";
import { types, PLAYER_ALL_GAMES_LIST_ID } from "./gameSearch.constants";
// import { sessionId as sessionIdSelector } from "Models/handshake";

export function* fetchPlayerGamesSaga() {
  // const sessionId = yield select(sessionIdSelector);
  // yield put(fetchPlayerGames({ sessionId }));
  yield put(fetchPlayerGames());

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE
  );

  const gameList = { id: PLAYER_ALL_GAMES_LIST_ID, games: response };
  const { entities } = yield call(normalizeData, { gameList });

  yield put(updateEntity(entities));
}
