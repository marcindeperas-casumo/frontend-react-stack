import { recordSaga } from "Utils";
import { MESSAGES as cometdMessages } from "Models/cometd";
import { timeRemainingNotificationSaga } from "./timeRemainingNotification.saga";
import { shouldShowSlotControlSystemSaga } from "./shouldShowSlotControlSystem.saga";
jest.mock("./shouldShowSlotControlSystem.saga", () => ({
  shouldShowSlotControlSystemSaga: jest.fn(),
}));
const expectedAction = {
  config: "object goes here",
  modalId: "SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION",
  type: "MODAL/SHOW",
  additionalProps: undefined,
};
describe("Models/slotControlSystem/timeRemainingNotificationSaga()", () => {
  beforeEach(() => {
    (shouldShowSlotControlSystemSaga as jest.Mock).mockReset();
  });
  test("spawns modal if shouldShowSlotControlSystemSaga returns true", async () => {
    (shouldShowSlotControlSystemSaga as jest.Mock).mockReturnValueOnce(true);
    const { effects } = await recordSaga({
      saga: timeRemainingNotificationSaga,
      args: [
        {
          data: {
            [cometdMessages.TIME_REMAINING_NOTIFICATION]: "object goes here",
          },
        },
      ],
    });
    expect(effects.put).toHaveLength(1);
    expect(effects.put[0].result).toStrictEqual(expectedAction);
  });
  test("does nothing if shouldShowSlotControlSystemSaga returns false", async () => {
    (shouldShowSlotControlSystemSaga as jest.Mock).mockReturnValueOnce(false);
    const { effects } = await recordSaga({
      saga: timeRemainingNotificationSaga,
      args: [
        {
          data: {
            [cometdMessages.TIME_REMAINING_NOTIFICATION]: "object goes here",
          },
        },
      ],
    });
    expect(effects.put).toBeUndefined();
  });
});
