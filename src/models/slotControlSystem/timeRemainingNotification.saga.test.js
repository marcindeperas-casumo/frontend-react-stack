import * as R from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { timeRemainingNotificationSaga } from "./timeRemainingNotification.saga";

test("Models/slotControlSystem/timeRemainingNotificationSaga()", () => {
  const gen = cloneableGenerator(timeRemainingNotificationSaga)({
    data: {
      [cometdMessages.TIME_REMAINING_NOTIFICATION]: "object goes here",
    },
  });
  const expectedAction = {
    config: "object goes here",
    modalId: "SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION",
    type: "MODAL/SHOW",
  };

  const timeRemainingNotification = gen.clone();
  const getAction = R.path(["value", "PUT", "action"]);

  expect(getAction(timeRemainingNotification.next())).toStrictEqual(
    expectedAction
  );
});
