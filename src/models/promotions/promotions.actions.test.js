import { types } from "./promotions.constants";
import * as actions from "./promotions.actions";

describe("Models/Promotions/Actions", () => {
  test("setPromotionOptIn()", () => {
    const slug = "foo";
    const checked = false;

    const action = {
      type: types.SET_PROMOTION_OPT_IN,
      slug,
      checked,
    };

    const setPromotionOptInDispatch = jest.fn();
    const getState = jest.fn(() => {
      return { promotions: "" };
    });

    actions.setPromotionOptIn(slug, checked)(
      setPromotionOptInDispatch,
      getState
    );

    expect(setPromotionOptInDispatch.mock.calls[0][0]).toEqual(action);
    expect(getState.mock.calls.length).toBe(1);
  });
});
