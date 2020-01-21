import { reducer } from "Models/player";

describe("Player/reducer", () => {
  test("initial state", () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({ wallet: {}, realityCheck: {}, sessionValid: true });
  });

  test("update player wallet", () => {
    const walletData = {
      amount: 999.7168,
      bonus: 93.1932,
      iso4217CurrencyCode: "EUR",
    };
    const action = {
      type: "COMETD/MESSAGE",
      channel: "/player/b1f45bc0-d687-11e7-bb7f-005056a937aa",
      data: {
        walletBalanceUpdated: {
          updatedBalance: {
            realBalance: {
              iso4217CurrencyCode: "EUR",
              amount: 999.7168,
            },
            bonusBalance: {
              amount: 93.1932,
              iso4217CurrencyCode: "EUR",
            },
          },
        },
      },
    };
    const state = reducer({}, action);
    expect(state).toMatchObject({ wallet: walletData });
  });

  test("update reality check", () => {
    const realityCheck = {
      type: "COMETD/MESSAGE",
      channel: "/player/b1f45bc0-d687-11e7-bb7f-005056a937aa",
      data: {
        realityCheck: {
          playerId: "5839ad10-695d-11e8-9bc7-0242ac110003",
          totalBetAmount: {
            amount: 59.5,
            iso4217CurrencyCode: "GBP",
          },
          totalWinAmount: {
            amount: 117.2,
            iso4217CurrencyCode: "GBP",
          },
          intervalSeconds: 60,
          sessionStartedTime: 1575534828508,
        },
      },
    };

    const state = reducer({}, realityCheck);
    expect(state).toMatchObject(realityCheck.data);
  });

  test("sessionValid is true by default", () => {
    const state = reducer(undefined, {});
    expect(state).toMatchObject({ sessionValid: true });
  });

  test("sessionValid is false when cometd message session ended is received", () => {
    const action = {
      type: "COMETD/MESSAGE",
      channel: "/session/d1be3423-d26e-4ce3-88c4-1916289ffb9b/ended",
      data: "TakenOver",
    };
    const state = reducer({}, action);
    expect(state).toMatchObject({ sessionValid: false });
  });
});
