import { select, put } from "redux-saga/effects";
import { updateEntity, ENTITY_KEYS } from "Models/schema";
import { reelRaceStartedSelector } from "Models/reelRaceWidget";

export function* updateLeaderboardSaga(action) {
  const {
    data: { leaderboard },
  } = action;

  const reelRace = yield select(reelRaceStartedSelector);

  if (reelRace) {
    yield put(updateEntity({ [ENTITY_KEYS.LEADERBOARD]: leaderboard }));
  }
}
