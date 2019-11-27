// @flow
import { omit } from "ramda";
import {
  ACTION_TYPES,
  slotControlSystemReducer,
  type SessionStateResponseType,
} from "Models/slotControlSystem";
import activeSessionMock from "./__mocks__/activeSession.mock";
import endedSessionMock from "./__mocks__/endedSession.mock";
import activeExclusionMock from "./__mocks__/activeExclusion.mock";

describe("Models/slotControlSystem/Reducer", () => {
  const now = Date.now();
  const responseActiveSession = omit(["lastUpdateTime"], activeSessionMock);
  let nowSpy;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    nowSpy.mockClear();
  });

  describe("UPDATE_SESSION", () => {
    test("response contains activeSession, state is empty", () => {
      const response: SessionStateResponseType = {
        activeSession: responseActiveSession,
        lastEndedSession: null,
        activeExclusion: null,
      };
      const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
      const state = {
        activeSession: null,
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        activeExclusion: null,
        lastEndedSession: null,
        activeSession: {
          ...response.activeSession,
          lastUpdateTime: now,
        },
      });
    });

    test("response contains activeSession, state contains activeSession", () => {
      const response: SessionStateResponseType = {
        activeSession: responseActiveSession,
        lastEndedSession: null,
        activeExclusion: null,
      };
      const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
      const state = {
        activeSession: {
          ...activeSessionMock,
          id: "999-999-999",
          lastUpdateTime: Date.now() - 1000 * 60 * 5,
          limit: {
            amount: 22,
            currency: "EUR",
          },
        },
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        activeExclusion: null,
        lastEndedSession: null,
        activeSession: {
          ...response.activeSession,
          lastUpdateTime: now,
        },
      });
    });

    test("response contains lastEndedSession, state contains activeSession and no lastEndedSession", () => {
      const response: SessionStateResponseType = {
        activeSession: null,
        lastEndedSession: endedSessionMock,
        activeExclusion: null,
      };
      const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
      const state = {
        activeSession: {
          ...activeSessionMock,
          id: "999-999-999",
          lastUpdateTime: Date.now() - 1000 * 60 * 5,
          limit: {
            amount: 22,
            currency: "EUR",
          },
        },
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        activeExclusion: null,
        lastEndedSession: response.lastEndedSession,
        activeSession: null,
      });
    });
  });

  test("response contains lastEndedSession and activeSession, state contains activeSession and lastEndedSession", () => {
    const response: SessionStateResponseType = {
      activeSession: responseActiveSession,
      lastEndedSession: endedSessionMock,
      activeExclusion: null,
    };
    const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
    const state = {
      activeSession: {
        ...activeSessionMock,
        id: "999-999-999",
        lastUpdateTime: Date.now() - 1000 * 60 * 5,
        limit: {
          amount: 22,
          currency: "EUR",
        },
      },
      lastEndedSession: {
        ...endedSessionMock,
        id: "777-777-777",
        endReason: "Player logout",
        endedTime: now - 1000 * 60 * 2,
      },
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeExclusion: null,
      lastEndedSession: response.lastEndedSession,
      activeSession: {
        ...response.activeSession,
        lastUpdateTime: now,
      },
    });
  });

  test("response contains activeExclusion, state is empty", () => {
    const response: SessionStateResponseType = {
      activeSession: null,
      lastEndedSession: null,
      activeExclusion: activeExclusionMock,
    };
    const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
    const state = {
      activeSession: null,
      lastEndedSession: null,
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeExclusion: activeExclusionMock,
      lastEndedSession: null,
      activeSession: null,
    });
  });
});
