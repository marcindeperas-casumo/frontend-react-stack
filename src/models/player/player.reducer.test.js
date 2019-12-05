import { reducer } from "Models/player";

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
