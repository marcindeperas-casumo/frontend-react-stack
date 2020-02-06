// @flow
import {
  ACTION_TYPES,
  slotControlSystemReducer,
  type SessionStateResponseType,
  type GameSessionStatsType,
} from "Models/slotControlSystem";
import activeSessionMock from "./__mocks__/activeSession.mock";
import endedSessionMock from "./__mocks__/endedSession.mock";
import activeExclusionMock from "./__mocks__/activeExclusion.mock";

describe("Models/slotControlSystem/Reducer", () => {
  const now = 1575462653148;
  const fiveMinutesBefore = now - 1000 * 60 * 5;
  const twoMinutesBefore = now - 1000 * 60 * 2;
  const responseActiveSession = { ...activeSessionMock };
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
        slugToCategoryMap: {},
        lastUpdateTime: 0,
        activeSession: null,
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        slugToCategoryMap: {},
        lastUpdateTime: now,
        activeExclusion: null,
        lastEndedSession: null,
        activeSession: {
          ...response.activeSession,
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
        slugToCategoryMap: {},
        lastUpdateTime: fiveMinutesBefore,
        activeSession: {
          ...activeSessionMock,
          id: "999-999-999",
          limit: {
            amount: 22,
            currency: "EUR",
          },
        },
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        slugToCategoryMap: {},
        lastUpdateTime: now,
        activeExclusion: null,
        lastEndedSession: null,
        activeSession: {
          ...response.activeSession,
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
        slugToCategoryMap: {},
        lastUpdateTime: fiveMinutesBefore,
        activeSession: {
          ...activeSessionMock,
          id: "999-999-999",
          limit: {
            amount: 22,
            currency: "EUR",
          },
        },
        lastEndedSession: null,
        activeExclusion: null,
      };

      expect(slotControlSystemReducer(state, action)).toEqual({
        slugToCategoryMap: {},
        lastUpdateTime: now,
        activeExclusion: null,
        lastEndedSession: response.lastEndedSession,
        activeSession: null,
      });
    });
  });

  describe("UPDATE_ACTIVE_SESSION_STATS", () => {
    test("properly updates stats in activeSession", () => {
      const stats: GameSessionStatsType = {
        consumedBalance: 1,
        initialLimit: 10,
        lastUpdateTime: now,
        remainingBalance: 0,
        totalBets: 1,
        totalWins: 0,
        currency: "EUR",
      };
      const action = {
        type: ACTION_TYPES.UPDATE_ACTIVE_SESSION_STATS,
        data: { stats },
      };
      const state = {
        slugToCategoryMap: {},
        lastUpdateTime: 0,
        lastEndedSession: null,
        activeExclusion: null,
        activeSession: {
          id: "1",
          expiringTime: now,
          startedTime: now,
          durationInSecs: 0,
          reminderFrequencyInSecs: 0,
          postSessionExclusionInMinutes: null,
          stats: {
            consumedBalance: 0,
            initialLimit: 10,
            lastUpdateTime: now,
            remainingBalance: 0,
            totalBets: 1,
            totalWins: 0,
            currency: "EUR",
          },
        },
      };

      expect(
        slotControlSystemReducer(state, action).activeSession?.stats
      ).toEqual(stats);
      expect(state.activeSession.stats).not.toEqual(stats);
    });
  });

  describe("UPDATE_SLUG_TO_CATEGORY_MAP", () => {
    test("properly updates slug to category map", () => {
      const slug = "tiger-rush";
      const categories = ["SLOT_MACHINE"];
      const action = {
        type: ACTION_TYPES.UPDATE_SLUG_TO_CATEGORY_MAP,
        slug,
        categories,
      };
      const state = {
        slugToCategoryMap: {},
        lastUpdateTime: 0,
        lastEndedSession: null,
        activeExclusion: null,
        activeSession: null,
      };

      expect(slotControlSystemReducer(state, action).slugToCategoryMap).toEqual(
        { [slug]: categories }
      );
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
      slugToCategoryMap: {},
      lastUpdateTime: fiveMinutesBefore,
      activeSession: {
        ...activeSessionMock,
        id: "999-999-999",
        limit: {
          amount: 22,
          currency: "EUR",
        },
      },
      lastEndedSession: {
        ...endedSessionMock,
        id: "777-777-777",
        endReason: "Player logout",
        endedTime: twoMinutesBefore,
      },
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      slugToCategoryMap: {},
      lastUpdateTime: now,
      activeExclusion: null,
      lastEndedSession: response.lastEndedSession,
      activeSession: {
        ...response.activeSession,
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
      slugToCategoryMap: {},
      lastUpdateTime: 0,
      activeSession: null,
      lastEndedSession: null,
      activeExclusion: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      slugToCategoryMap: {},
      lastUpdateTime: now,
      activeExclusion: activeExclusionMock,
      lastEndedSession: null,
      activeSession: null,
    });
  });
});
