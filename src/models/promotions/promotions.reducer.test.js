import { STORE_REHYDRATE } from "Src/constants";
import reducer from "./promotions.reducer";
import { setPromotionOptIn } from "./promotions.actions";

describe("Models/Promotions/Reducer", () => {
  test("store rehydrate empty", () => {
    const state = {};
    const promotions = {};

    const result = reducer(state, { type: STORE_REHYDRATE, state: promotions });
    expect(result).toEqual({});
  });

  test("store rehydrate with pre-existing data", () => {
    const state = {};
    const rehydrateState = {
      promotions: {
        foo: {
          checked: true,
          timestamp: 12345,
        },
      },
    };

    const result = reducer(state, {
      type: STORE_REHYDRATE,
      state: rehydrateState,
    });

    expect(result).toEqual(rehydrateState.promotions);
  });

  test("set promotion opt-in", () => {
    const slug = "foo";
    const checked = false;

    const state = {};

    const setPromotionOptInDispatch = jest.fn();
    const getState = jest.fn(() => {
      return { promotions: "" };
    });

    setPromotionOptIn(slug, checked)(setPromotionOptInDispatch, getState);

    const result = reducer(state, setPromotionOptInDispatch.mock.calls[0][0]);

    expect(Object.keys(result)[0]).toEqual(slug);
    expect(result[slug].checked).toBeFalsy();
  });
});
