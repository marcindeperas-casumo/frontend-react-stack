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
      lock: null,
    };
    const action = {
      type: depositLimitsTypes.FETCH_ALL_DONE,
      response: [allLimits],
    };

    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      limits: "1.limit.value",
      undoable: true,
      lock: null,
      preadjust: undefined,
      history: undefined,
      pendingLimitChanges: undefined,
      remaining: undefined,
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
          remaining: undefined,
          history: undefined,
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
      response: {
        kind: "DGOJ_DEPOSIT_LIMIT",
        limit: {
          value: {
            currency: "EUR",
            daily: 600,
            weekly: 1500,
            monthly: 3000,
          },
        },
        undoable: false,
        lock: null,
      },
    };
    expect(
      depositLimitsReducer(
        {
          ...DEFAULT_STATE,
          limits: {
            currency: "EUR",
            daily: 600,
            weekly: 1500,
            monthly: 3000,
          },
          undoable: false,
          pendingLimitChanges: {
            approvalRequired: false,
            confirmationRequired: false,
            effectiveFrom: "2012-12-12T12:12:12Z",
            reviewerApproved: false,
            value: {
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ currency: string; daily: number; weekly: n... Remove this comment to see the full error message
              currency: "EUR",
              daily: 666,
              weekly: 1500,
              monthly: 3000,
            },
          },
        },
        action
      )
    ).toEqual({
      limits: {
        currency: "EUR",
        daily: 600,
        weekly: 1500,
        monthly: 3000,
      },
      lock: null,
      preadjust: undefined,
      remaining: undefined,
      pendingLimitChanges: undefined,
      undoable: false,
    });
  });

  test("GET_HISTORY_DONE", () => {
    const action = {
      type: depositLimitsTypes.GET_HISTORY_DONE,
      response: [
        {
          id: "413a0771-e7a9-4c4f-a7b3-3cd9856cd63f",
          request: {
            timestamp: "2019-08-05T14:25:20Z",
          },
          stateBefore: { undoable: false },
          stateAfter: {
            undoable: false,
            limit: {
              value: {
                daily: 5e2,
                monthly: 1e4,
                currency: "EUR",
                weekly: 2.5e3,
              },
            },
          },
        },
        {
          id: "cd4ef6bf-74f1-49fa-86c7-8b157af0c44d",
          request: {
            timestamp: "2019-08-02T16:19:26Z",
          },
          stateBefore: {
            undoable: false,
            adjustment: {
              approvalRequired: true,
              reviewerApproved: false,
              confirmationRequired: false,
            },
            limit: {
              value: {
                daily: 666,
                monthly: 3e3,
                currency: "EUR",
                weekly: 1.5e3,
              },
            },
          },
          stateAfter: {
            undoable: false,
            lock: { expiresOn: "2019-10-31T17:19:25.565001Z" },
          },
        },
        {
          id: "2e48a8fa-e0bb-4132-8aba-7348bc21dd58",
          request: {
            timestamp: "2019-08-02T14:31:07Z",
          },
          stateBefore: {
            undoable: false,
            adjustment: {
              value: {
                daily: 666,
                monthly: 3e3,
                currency: "EUR",
                weekly: 1.5e3,
              },
              approvalRequired: true,
              reviewerApproved: false,
              confirmationRequired: false,
            },
            limit: {
              value: {
                daily: 595,
                monthly: 3e3,
                currency: "EUR",
                weekly: 1.5e3,
              },
            },
          },
          stateAfter: {
            undoable: false,
            limit: {
              value: {
                daily: 666,
                monthly: 3e3,
                currency: "EUR",
                weekly: 1.5e3,
              },
            },
            lock: { expiresOn: "2019-10-31T15:31:07.391976Z" },
          },
        },
      ],
    };

    expect(depositLimitsReducer(DEFAULT_STATE, action)).toEqual({
      history: [
        {
          changes: [
            {
              limitKind: "daily",
              after: 500,
              before: null,
            },
            {
              limitKind: "weekly",
              after: 2500,
              before: null,
            },
            {
              limitKind: "monthly",
              after: 10000,
              before: null,
            },
          ],
          setOnRegistration: false,
          id: "413a0771-e7a9-4c4f-a7b3-3cd9856cd63f",
          timestamp: "2019-08-05T14:25:20Z",
          type: "created",
        },
        {
          changes: [
            {
              limitKind: "daily",
              after: null,
              before: 666,
            },
            {
              limitKind: "weekly",
              after: null,
              before: 1500,
            },
            {
              limitKind: "monthly",
              after: null,
              before: 3000,
            },
          ],
          setOnRegistration: false,
          id: "cd4ef6bf-74f1-49fa-86c7-8b157af0c44d",
          timestamp: "2019-08-02T16:19:26Z",
          type: "removed",
        },
        {
          changes: [
            {
              limitKind: "daily",
              after: 666,
              before: 595,
            },
          ],
          setOnRegistration: false,
          id: "2e48a8fa-e0bb-4132-8aba-7348bc21dd58",
          timestamp: "2019-08-02T14:31:07Z",
          type: "increase",
        },
      ],
      limits: undefined,
      lock: undefined,
      pendingLimitChanges: undefined,
      preadjust: undefined,
      remaining: undefined,
      undoable: undefined,
    });
  });
});
