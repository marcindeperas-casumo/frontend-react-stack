import { call, put, take } from "redux-saga/effects";
import { normalizeData, updateEntity } from "Models/schema";
import { fetchPlayerGames } from "./gameSearch.actions";
import { types } from "./gameSearch.constants";

export function* fetchPlayerGamesSaga() {
  yield put(fetchPlayerGames());

  const { response } = yield take(
    types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE
  );

  const gameList = { id: "allPlayerGames", games: response.games };
  const { entities } = yield call(normalizeData, { gameList });

  yield put(updateEntity(entities));
}
