import { isPromotionOptedInSelector } from "./promotions.selectors";

describe("Models/Promotions/Selectors", () => {
  test("isPromotionOptedInSelector is true", () => {
    const state = {
      promotions: {
        foo: {
          checked: true,
        },
      },
    };

    expect(isPromotionOptedInSelector("foo")(state)).toBeTruthy();
  });

  test("isPromotionOptedInSelector is false", () => {
    const state = {
      promotions: {
        foo: {
          checked: false,
        },
      },
    };

    expect(isPromotionOptedInSelector("foo")(state)).toBeFalsy();
  });

  test("isPromotionOptedInSelector is null if not found", () => {
    const state = {
      promotions: {},
    };

    expect(isPromotionOptedInSelector("foo")(state)).toBeNull();
  });
});
