import { types } from "./playOkay.actions";
import { playOkayReducer } from "./playOkay.reducer";

describe("Models/playOkay/PlayOkayReducer", () => {
  test("PLAYOK_FETCH_ALL_LIMITS_COMPLETED", () => {
    const action = {
      type: types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED,
      response: {
        moneyLimits: [],
      },
    };

    expect(playOkayReducer({}, action)).toMatchObject({
      moneyLimits: [],
    });
  });

  test("PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED", () => {
    const action = { type: types.PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED };

    expect(playOkayReducer({}, action)).toHaveProperty(
      "isDepositLimitProperlySet",
      true
    );
  });
});
