// @flow
import {
  configurationFormContentSelector,
  isFetchingActiveSessionSelector,
  activeSessionUpdatedAtSelector,
  activeSessionSelector,
  isCreatingSessionSelector,
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

  test("activeSessionUpdatedAtSelector", () => {
    const now = Date.now();
    const state = {
      slotControlSystem: {
        activeSession: { id: "123-123-123" },
        updatedAt: now,
      },
    };

    expect(activeSessionUpdatedAtSelector(state)).toEqual(now);
  });

  test("activeSessionSelector", () => {
    const now = Date.now();
    const activeSession = { id: "123-123-123" };
    const state = {
      slotControlSystem: {
        activeSession,
        updatedAt: now,
      },
    };

    expect(activeSessionSelector(state)).toEqual(activeSession);
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
});
