// @flow
import {
  ACTION_TYPES,
  slotControlSystemReducer,
} from "Models/slotControlSystem";
import activeSession from "./__mocks__/activeSession.mock";

describe("Models/slotControlSystem/Reducer", () => {
  const now = Date.now();
  let nowSpy;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    nowSpy.mockClear();
  });

  test("UPDATE_SESSION", () => {
    const response = { id: "123-123-456" };
    const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
    const state = {
      activeSession: null,
      endedSession: null,
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeExclusion: null,
      endedSession: null,
      activeSession: {
        ...response,
        lastUpdateTime: now,
      },
    });
  });

  test("INVALIDATE_SESSION", () => {
    const action = { type: ACTION_TYPES.INVALIDATE_SESSION };
    const state = {
      activeSession,
      endedSession: null,
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeExclusion: null,
      activeSession: null,
      endedSession: {
        id: activeSession.id,
        endTime: activeSession.expiringTime,
      },
    });
  });
});
