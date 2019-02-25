import { put, select } from "redux-saga/effects";
import {
  fetchPlayerGamesCount,
  playerGamesCountSelector,
} from "Models/playerGames";

export function* fetchPlayerGamesCountSaga() {
  const count = yield select(playerGamesCountSelector);

  if (count) {
    return;
  }

  yield put(fetchPlayerGamesCount());
}
