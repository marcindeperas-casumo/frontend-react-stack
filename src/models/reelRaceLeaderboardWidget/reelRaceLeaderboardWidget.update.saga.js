import { select, put } from "redux-saga/effects";
import { mergeEntity } from "Models/schema";
import { reelRaceWidgetSelector } from "Models/reelRaceWidget";

export function* updateLeaderboardSaga(action) {
  const {
    data: { leaderboard },
  } = action;

  const rr = yield select(reelRaceWidgetSelector);

  if (rr) {
    const reelRaces = {
      [rr.tournamentId]: { leaderboard },
    };

    yield put(mergeEntity({ reelRaces }));
  }
}
