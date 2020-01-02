// @flow
import {
  lastUpdateTimeSelector,
  configurationFormContentSelector,
  isFetchingActiveSessionSelector,
  activeSessionSelector,
  endedSessionSelector,
  isCreatingSessionSelector,
  activeExclusionSelector,
  ACTION_TYPES,
} from "Models/slotControlSystem";

describe("Slot Control System selectors", () => {
  test("configurationFormContentSelector", () => {
    const unitsFields = {
      minutes_abbreviated: "{{minutes}}mins",
      hours_abbreviated: "{{hours}}hrs",
    };
    const modalFields = {
      limit_your_budget: "limit_your_budget",
      use_all_balance: "use_all_balance",
      error_budget_too_low: "error_budget_too_low",
      error_budget_too_high: "error_budget_too_high",
    };
    const state = {
      schema: {
        cms: {
          units: {
            slug: "units",
            fields: unitsFields,
          },
          "slot-control-system.configure-session-screen": {
            slug: "slot-control-system.configure-session-screen",
            fields: modalFields,
          },
        },
      },
    };

    expect(configurationFormContentSelector(state)).toEqual({
      ...unitsFields,
      ...modalFields,
    });
  });

  test("isFetchingActiveSessionSelector", () => {
    const state = {
      fetch: {
        [ACTION_TYPES.FETCH_SESSION_INIT]: {
          isFetching: true,
        },
      },
    };

    expect(isFetchingActiveSessionSelector(state)).toEqual(true);
  });

  test("activeSessionSelector", () => {
    const now = Date.now();
    const activeSession = { id: "123-123-123", lastUpdateTime: now };
    const state = {
      slotControlSystem: {
        activeSession,
        lastEndedSession: null,
      },
    };

    expect(activeSessionSelector(state)).toEqual(activeSession);
  });

  test("endedSessionSelector", () => {
    const now = Date.now();
    const lastEndedSession = { id: "123-123-123", endTime: now };
    const state = {
      slotControlSystem: {
        activeSession: null,
        lastEndedSession,
      },
    };

    expect(endedSessionSelector(state)).toEqual(lastEndedSession);
  });

  test("isCreatingSessionSelector", () => {
    const state = {
      fetch: {
        [ACTION_TYPES.CREATE_SESSION_INIT]: {
          isFetching: true,
        },
      },
    };

    expect(isCreatingSessionSelector(state)).toEqual(true);
  });

  test("activeExclusionSelector", () => {
    const now = Date.now();
    const activeExclusion = { id: "123-123-123", expiryTime: now };
    const state = {
      slotControlSystem: {
        activeSession: null,
        lastEndedSession: null,
        activeExclusion,
      },
    };

    expect(activeExclusionSelector(state)).toEqual(activeExclusion);
  });

  test("lastUpdateTimeSelector", () => {
    const lastUpdateTime = 1575462320308;
    const state = {
      slotControlSystem: {
        activeSession: null,
        lastEndedSession: null,
        activeExclusion: null,
        lastUpdateTime,
      },
    };

    expect(lastUpdateTimeSelector(state)).toEqual(lastUpdateTime);
  });
});
