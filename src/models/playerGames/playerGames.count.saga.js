import {
  fetchPlayerGamesCount,
  playerGamesCountSelector,
} from "Models/playerGames";
import { put, select } from "redux-saga/effects";

export function* fetchPlayerGamesCountSaga() {
  const count = yield select(playerGamesCountSelector);

  if (count) {
    return;
  }

  yield put(fetchPlayerGamesCount({}));
}
