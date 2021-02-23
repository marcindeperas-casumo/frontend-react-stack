// @flow
import * as R from "ramda";
import { put } from "redux-saga/effects";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { updateActiveSessionStats } from "Models/slotControlSystem";

export function* statsUpdateNotificationSaga(action: any): any {
  const activeSessionStats = R.pipe(
    R.path(["data", cometdMessages.STATS_UPDATED_NOTIFICATION]),
    R.omit(["sessionId", "playerId"])
  )(action);

  yield put(updateActiveSessionStats(activeSessionStats));
}
