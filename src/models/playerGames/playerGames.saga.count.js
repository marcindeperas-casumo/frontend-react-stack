import { put } from "redux-saga/effects";
import { fetchPlayerGamesCount } from "Models/playerGames";

export function* fetchPlayerGamesCountSaga() {
  // select sessionId for the request
  yield put(fetchPlayerGamesCount());
}
