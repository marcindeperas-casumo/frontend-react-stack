import { fiveMinuteBreakSelector } from "./fiveMinuteBreak.selectors";

describe("Models/fiveMinuteBreak/fiveMinuteBreakSelectors", () => {
  describe("fiveMinuteBreakSelector", () => {
    test("returns GGL RC data", () => {
      const rcData = {
        activeRCSession: { startedTime: 123, expiringTime: 321 },
        activeRCBreak: null,
      };
      const state = { fiveMinuteBreak: rcData };

      expect(fiveMinuteBreakSelector(state)).toEqual(rcData);
    });
  });
});
