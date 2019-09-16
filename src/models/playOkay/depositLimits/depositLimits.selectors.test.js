// @flow
import {
  getDepositLimitsSelector,
  getDepositLimitsHistorySelector,
  hasRule,
  getDepositLimitsForOverviewScreenSelector,
  getCurrencyAndLocaleSelector,
  getPendingLimitChangesSelector,
  canIncreaseLimitsSelector,
} from "./depositLimits.selectors";

describe("Models/playOkay/depositLimits/.selectors", () => {
  test("getDepositLimitsSelector", () => {
    expect(
      getDepositLimitsSelector({
        playOkay: {
          depositLimits: {
            everything: "everything",
            else: "else",
            will: "will",
            be: "returned",
            history: "won't be in returned value",
          },
        },
      })
    ).toEqual({
      everything: "everything",
      else: "else",
      will: "will",
      be: "returned",
    });
  });

  test("getDepositLimitsHistorySelector", () => {
    expect(
      getDepositLimitsHistorySelector({
        playOkay: {
          depositLimits: {
            history: "history goes here",
          },
        },
      })
    ).toEqual("history goes here");
  });

  test("hasRule", () => {
    expect(
      hasRule("REVOCATION_ALLOWED", [
        "APPROVAL_REQUIRED_FOR_SUBSEQUENT_INCREASES",
        "APPROVAL_REQUIRED_FOR_INCREASE",
        "RESPONSIBLE_GAMBLING_TEST_REQUIRED",
        "DECREASE_EFFECTIVE_IMMEDIATELY",
        "REVOCATION_ALLOWED",
      ])
    ).toEqual(true);
    expect(hasRule("REVOCATION_ALLOWED", ["REVOCATION_ALLOWED"])).toEqual(true);
    expect(
      hasRule("REVOCATION_ALLOWED", ["APPROVAL_REQUIRED_FOR_INCREASE"])
    ).toEqual(false);
  });

  test("getDepositLimitsForOverviewScreenSelector", () => {
    expect(
      getDepositLimitsForOverviewScreenSelector({
        playOkay: {
          depositLimits: {
            limits: {
              previouslyIncreased: true,
              daily: 1000,
              monthly: 4000,
              currency: "EUR",
              weekly: 2000,
            },
            remaining: {
              previouslyIncreased: true,
              daily: 500,
              monthly: 2000,
              currency: "EUR",
              weekly: 1000,
            },
          },
        },
      })
    ).toEqual([
      { limitKind: "daily", remaining: 500, value: 1000 },
      { limitKind: "weekly", remaining: 1000, value: 2000 },
      { limitKind: "monthly", remaining: 2000, value: 4000 },
    ]);
  });

  test("getCurrencyAndLocaleSelector", () => {
    const handshake = {
      app: {
        "common/composition/session": { id: "p1" },
        "common/composition/players": {
          players: {
            p1: {
              id: "p1",
              market: "gb_en",
              wallet: { balance: { iso4217CurrencyCode: "GBP" } },
            },
          },
        },
      },
    };

    expect(
      getCurrencyAndLocaleSelector({
        handshake,
        playOkay: {
          depositLimits: {
            limits: {
              previouslyIncreased: true,
              daily: 1000,
              monthly: 4000,
              currency: "EUR",
              weekly: 2000,
            },
          },
        },
      })
    ).toEqual({ currency: "EUR", locale: "en-GB" });

    expect(
      getCurrencyAndLocaleSelector({
        handshake,
        playOkay: {
          depositLimits: {
            limits: {},
          },
        },
      })
    ).toEqual({ currency: "GBP", locale: "en-GB" });
  });

  test("getPendingLimitChangesSelector", () => {
    expect(
      getPendingLimitChangesSelector({
        playOkay: {
          depositLimits: {
            pendingLimitChanges: {
              value: {
                daily: 1000,
                monthly: 4000,
                weekly: 2000,
              },
            },
          },
        },
      })
    ).toEqual({
      allRemoved: false,
      pendingChanges: [
        { limitKind: "daily", value: 1000 },
        { limitKind: "weekly", value: 2000 },
        { limitKind: "monthly", value: 4000 },
      ],
    });

    expect(
      getPendingLimitChangesSelector({
        playOkay: {
          depositLimits: {
            pendingLimitChanges: {
              value: {
                daily: null,
                monthly: null,
                weekly: null,
              },
            },
          },
        },
      })
    ).toEqual({
      allRemoved: true,
      pendingChanges: [
        { limitKind: "daily", value: null },
        { limitKind: "weekly", value: null },
        { limitKind: "monthly", value: null },
      ],
    });
  });

  test("canIncreaseLimitsSelector", () => {
    expect(
      canIncreaseLimitsSelector({
        playOkay: {
          depositLimits: {
            pendingLimitChanges: {
              approvalRequired: true,
              reviewerApproved: false,
              confirmationRequired: false,
              value: {
                daily: 1000,
                monthly: 4000,
                weekly: 2000,
              },
            },
            lock: null,
          },
        },
      })
    ).toEqual(false);
    expect(
      canIncreaseLimitsSelector({
        playOkay: {
          depositLimits: { lock: "2019-07-31T20:04:23.048184+02:00" },
        },
      })
    ).toEqual(false);
    expect(
      canIncreaseLimitsSelector({
        playOkay: {
          depositLimits: { lock: null },
        },
      })
    ).toEqual(true);
  });
});
