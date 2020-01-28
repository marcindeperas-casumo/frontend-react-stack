import * as R from "ramda";
import { cloneableGenerator } from "redux-saga/utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { limitAlmostConsumedNotificationSaga } from "./limitAlmostConsumedNotification.saga";

test("Models/slotControlSystem/limitAlmostConsumedNotificationSaga()", () => {
  const gen = cloneableGenerator(limitAlmostConsumedNotificationSaga)({
    data: {
      [cometdMessages.LIMIT_ALMOST_CONSUMED_NOTIFICATION]: "object goes here",
    },
  });
  const expectedAction = {
    config: "object goes here",
    modalId: "SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION",
    type: "MODAL/SHOW",
  };

  const limitAlmostConsumedNotification = gen.clone();
  const getAction = R.path(["value", "PUT", "action"]);

  expect(getAction(limitAlmostConsumedNotification.next())).toStrictEqual(
    expectedAction
  );
});
