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

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
    expect(fiveMinuteBreakReducer(state, action)).toEqual(rcData);
  });
});
