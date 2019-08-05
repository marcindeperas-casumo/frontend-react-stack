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
      responsibleGamblingTest: undefined,
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
          },
          undoable: false,
          lock: undefined,
          preadjust: undefined,
          pendingLimitChanges: undefined,
          responsibleGamblingTest: undefined,
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

  test("CANCEL_PENDING_LIMIT_CHANGE_DONE", () => {
    const action = {
      type: depositLimitsTypes.CANCEL_PENDING_LIMIT_CHANGE_DONE,
      response: [
        {
          playerId: "5580cee8-3bf9-42ce-b605-5a9062e03520",
          kind: "DGOJ_DEPOSIT_LIMIT",
          schema: "MONETARY_AMOUNT_PERIODS_AND_INCREASED",
          undoable: false,
          adjustment: {
            approvalRequired: false,
            confirmationRequired: false,
            reviewerApproved: false,
            effectiveFrom: "2019-08-07T13:41:58+02:00",
            value: {
              previouslyIncreased: true,
              daily: 666,
              monthly: 3000,
              currency: "EUR",
              weekly: 1499,
            },
          },
          limit: {
            value: {
              previouslyIncreased: true,
              daily: 600,
              monthly: 3000,
              currency: "EUR",
              weekly: 1499,
            },
          },
        },
      ],
    };
    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      pendingLimitChanges: {
        approvalRequired: false,
        confirmationRequired: false,
        reviewerApproved: false,
        effectiveFrom: "2019-08-07T13:41:58+02:00",
        value: {
          daily: 666,
        },
      },
      limits: {
        currency: "EUR",
        daily: 600,
        monthly: 3000,
        previouslyIncreased: true,
        weekly: 1499,
      },
      lock: undefined,
      preadjust: undefined,
      remaining: undefined,
      responsibleGamblingTest: undefined,
      undoable: false,
    });
  });
});
