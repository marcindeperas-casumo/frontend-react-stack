import * as R from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { periodicReminderNotificationSaga } from "./periodicReminderNotification.saga";

test("Models/slotControlSystem/periodicReminderNotificationSaga()", () => {
  const gen = cloneableGenerator(periodicReminderNotificationSaga)({
    data: {
      [cometdMessages.PERIODIC_REMINDER_NOTIFICATION]: "object goes here",
    },
  });
  const expectedAction = {
    config: "object goes here",
    modalId: "SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION",
    type: "MODAL/SHOW",
  };

  const periodicReminderNotification = gen.clone();
  const getAction = R.path(["value", "PUT", "action"]);

  expect(getAction(periodicReminderNotification.next())).toStrictEqual(
    expectedAction
  );
});
