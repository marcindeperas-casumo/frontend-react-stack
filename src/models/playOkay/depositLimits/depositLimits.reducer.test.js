// @flow
import { depositLimitsTypes } from "./depositLimits.constants";
import { DEFAULT_STATE, depositLimitsReducer } from "./depositLimits.reducer";

describe("Models/playOkay/depositLimits/.reducer", () => {
  test("FETCH_ALL_DONE", () => {
    const allLimits = {
      kind: "DGOJ_DEPOSIT_LIMIT",
      limit: {
        value: "1.limit.value",
      },
      undoable: true,
      lock: false,
    };
    const action = {
      type: depositLimitsTypes.FETCH_ALL_DONE,
      response: [allLimits],
    };

    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      limits: "1.limit.value",
      undoable: true,
      lock: false,
      preadjust: undefined,
    });
  });

  test("ADJUST_DONE", () => {
    const action = {
      type: depositLimitsTypes.ADJUST_DONE,
      response: {
        limit: {
          value: {
            daily: 0,
            weekly: 0,
            monthly: 1, // <-- change
            currency: "EUR",
            previouslyIncreased: false,
          },
        },
      },
    };
    expect(
      depositLimitsReducer(
        {
          limits: {
            daily: 0,
            weekly: 0,
            monthly: 0,
            currency: "EUR",
            previouslyIncreased: false,
          },
          undoable: false,
          lock: undefined,
          preadjust: undefined,
          remaining: undefined,
        },
        action
      )
    ).toEqual({
      limits: {
        daily: 0,
        weekly: 0,
        monthly: 1,
        currency: "EUR",
        previouslyIncreased: false,
      },
      undoable: false,
      lock: undefined,
      preadjust: undefined,
    });
  });

  test("PREADJUST_DONE", () => {
    const action = {
      type: depositLimitsTypes.PREADJUST_DONE,
      response: "preadjust response",
    };
    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      preadjust: "preadjust response",
    });
  });

  test("REMAINING_LIMITS_DONE", () => {
    const action = {
      type: depositLimitsTypes.REMAINING_LIMITS_DONE,
      response: {
        value: "remaining limits",
      },
    };
    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      remaining: "remaining limits",
    });
  });
});
