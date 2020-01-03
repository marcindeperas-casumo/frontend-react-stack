// @flow
import { type Saga } from "redux-saga";
import { put } from "redux-saga/effects";
import { omit } from "ramda";
import { MESSAGES } from "Models/cometd";
import {
  type UpdateStatsCometdMessage,
  updateStatsAction,
} from "Models/slotControlSystem";

export function* updateStatsSaga(
  message: UpdateStatsCometdMessage
): Saga<void> {
  yield put(
    updateStatsAction(
      omit(
        ["sessionId", "playerId"],
        message.data[MESSAGES.SLOT_CONTROL_SYSTEM_STATS_UPDATED]
      )
    )
  );
}
