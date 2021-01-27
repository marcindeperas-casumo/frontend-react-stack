import { gglRealityCheckUpdateAction } from "./fiveMinuteBreak.actions";
import { fiveMinuteBreakReducer } from "./fiveMinuteBreak.reducer";

describe("Models/fiveMinuteBreak/fiveMinuteBreakReducer", () => {
  test("UPDATE", () => {
    const rcData = {
      activeRCSession: { startedTime: 123, expiringTime: 321 },
      activeRCBreak: null,
    };
    const action = gglRealityCheckUpdateAction(rcData);
    const state = {};

    expect(fiveMinuteBreakReducer(state, action)).toEqual(rcData);
  });
});
