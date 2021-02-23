import * as R from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { statsUpdateNotificationSaga } from "./statsUpdateNotification.saga";

test("Models/slotControlSystem/statsUpdateNotificationSaga()", () => {
  const gen = cloneableGenerator(statsUpdateNotificationSaga)({
    data: {
      [cometdMessages.STATS_UPDATED_NOTIFICATION]: {
        sessionId: "we don't want that in the output",
        playerId: "we don't want that in the output",
        a: 1,
        b: 2,
      },
    },
  });
  const expectedAction = {
    data: { a: 1, b: 2 },
    type: "SLOT_CONTROL_SYSTEM/UPDATE_ACTIVE_SESSION_STATS",
  };

  const periodicReminderNotification = gen.clone();
  const getAction = R.path(["value", "PUT", "action"]);

  expect(getAction(periodicReminderNotification.next())).toStrictEqual(
    expectedAction
  );
});
