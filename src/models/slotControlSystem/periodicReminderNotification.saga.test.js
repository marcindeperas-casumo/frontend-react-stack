// @flow
import { recordSaga } from "Utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { periodicReminderNotificationSaga } from "./periodicReminderNotification.saga";
import { shouldShowSlotControlSystemSaga } from "./shouldShowSlotControlSystem.saga";

jest.mock("./shouldShowSlotControlSystem.saga", () => ({
  shouldShowSlotControlSystemSaga: jest.fn(),
}));

const expectedAction = {
  config: "object goes here",
  modalId: "SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION",
  type: "MODAL/SHOW",
};

describe("Models/slotControlSystem/periodicReminderNotificationSaga()", () => {
  beforeEach(() => {
    // $FlowIgnore
    shouldShowSlotControlSystemSaga.mockReset();
  });
  test("spawns modal if shouldShowSlotControlSystemSaga returns true", async () => {
    // $FlowIgnore
    shouldShowSlotControlSystemSaga.mockReturnValueOnce(true);
    const { effects } = await recordSaga({
      saga: periodicReminderNotificationSaga,
      args: [
        {
          data: {
            [cometdMessages.PERIODIC_REMINDER_NOTIFICATION]: "object goes here",
          },
        },
      ],
    });

    expect(effects.put).toHaveLength(1);
    expect(effects.put[0].result).toStrictEqual(expectedAction);
  });

  test("does nothing if shouldShowSlotControlSystemSaga returns false", async () => {
    // $FlowIgnore
    shouldShowSlotControlSystemSaga.mockReturnValueOnce(false);
    const { effects } = await recordSaga({
      saga: periodicReminderNotificationSaga,
      args: [
        {
          data: {
            [cometdMessages.PERIODIC_REMINDER_NOTIFICATION]: "object goes here",
          },
        },
      ],
    });

    expect(effects.put).toBeUndefined();
  });
});
