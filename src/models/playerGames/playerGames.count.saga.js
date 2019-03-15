import { put, select } from "redux-saga/effects";
import { sessionId as sessionIdSelector } from "Models/handshake";
import {
  fetchPlayerGamesCount,
  playerGamesCountSelector,
} from "Models/playerGames";

export function* fetchPlayerGamesCountSaga() {
  const sessionId = yield select(sessionIdSelector);
  const count = yield select(playerGamesCountSelector);

  if (count) {
    return;
  }

  yield put(fetchPlayerGamesCount({ sessionId }));
}
