import { put } from "redux-saga/effects";
import * as R from "ramda";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { updateActiveSessionStats } from "Models/slotControlSystem";

export function* statsUpdateNotificationSaga(action: any): any {
  const activeSessionStats = R.pipe(
    R.path(["data", cometdMessages.STATS_UPDATED_NOTIFICATION]),
    R.omit(["sessionId", "playerId"])
  )(action);

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Pick<unknown, never>' is not ass... Remove this comment to see the full error message
  yield put(updateActiveSessionStats(activeSessionStats));
}
