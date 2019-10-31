// @flow
import {
  ACTION_TYPES,
  slotControlSystemReducer,
} from "Models/slotControlSystem";

describe("Models/slotControlSystem/Reducer", () => {
  const now = Date.now();
  let nowSpy;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    nowSpy.mockClear();
  });

  describe("UPDATE_SESSION", () => {
    test("there is no active session nor previous session", () => {
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

    test("there is active session and ended session", () => {
      const response = { id: "123-123-456" };
      const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
      const activeSession = {
        id: "222-222-222",
        lastUpdateTime: 222222222,
      };
      const endedSession = {
        id: "444-444-444",
        endTime: 123123123,
      };
      const state = {
        activeSession,
        endedSession,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        activeExclusion: null,
        endedSession,
        activeSession: {
          ...response,
          lastUpdateTime: now,
        },
      });
    });

    test("there is active session but it expires", () => {
      const response = null;
      const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
      const activeSession = {
        id: "222-222-222",
        lastUpdateTime: 222222222,
      };
      const endedSession = {
        id: "444-444-444",
        endTime: 123123123,
      };
      const state = {
        activeSession,
        endedSession,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        endedSession: {
          id: activeSession.id,
          endTime: now,
        },
        activeSession: null,
        activeExclusion: null,
      });
    });
  });

  test("INVALIDATE_SESSION", () => {
    const activeSession = {
      id: "123-345-456-677",
      lastUpdateTime: now,
    };
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
        endTime: now,
      },
    });
  });
});
