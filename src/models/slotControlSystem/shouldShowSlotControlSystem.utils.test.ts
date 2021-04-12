import { isSlotGame } from "./shouldShowSlotControlSystem.utils";

describe("Models/slotControlSystem/shouldShowSlotControlSystem", () => {
  test("isSlotGame", () => {
    expect(isSlotGame("BINGO")).toBe(true);
    expect(isSlotGame("LIVE_CASINO")).toBe(false);
    expect(isSlotGame("OTHER")).toBe(false);
    expect(isSlotGame("SLOT_MACHINE")).toBe(true);
  });
});
