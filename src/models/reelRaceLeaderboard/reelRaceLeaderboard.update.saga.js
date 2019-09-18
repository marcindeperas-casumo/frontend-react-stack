import { select, put } from "redux-saga/effects";
import { mergeEntity } from "Models/schema";
import { reelRaceStartedSelector } from "Models/reelRaceWidget";

export function* updateLeaderboardSaga(action) {
  const {
    data: { leaderboard },
  } = action;

  const rr = yield select(reelRaceStartedSelector);

  if (rr) {
    yield put(mergeEntity({ leaderboard }));
  }
}
