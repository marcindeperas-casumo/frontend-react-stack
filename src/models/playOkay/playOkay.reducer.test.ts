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

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
    expect(playOkayReducer({}, action)).toMatchObject({
      moneyLimits: [],
    });
  });

  test("PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED", () => {
    const action = { type: types.PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
    expect(playOkayReducer({}, action)).toHaveProperty(
      "isDepositLimitProperlySet",
      true
    );
  });
});
