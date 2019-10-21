// @flow
import { configurationFormContentSelector } from "./slotControlSystem.selectors";

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
});
