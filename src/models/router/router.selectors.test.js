import {
  routerComponentsSelector,
  activeComponents,
  routeParamsSelector,
} from "./router.selectors";

describe("Models/Router/Selectors", () => {
  test("routerComponentsSelector", () => {
    const state = {
      router: { foo: "bar " },
    };

    expect(routerComponentsSelector(state)).toEqual({ foo: "bar " });
  });

  test("activeComponents", () => {
    const state = {
      router: {
        activeComponents: ["a"],
      },
    };

    expect(activeComponents(state)).toEqual(["a"]);
  });

  test("activeComponents return empty array if nothing is set in the state", () => {
    const state = {
      router: {},
    };

    expect(activeComponents(state)).toEqual([]);
  });

  describe("routeParamsSelector()", () => {
    test("returns with the routeParams object", () => {
      const routeParams = { foo: "bar" };
      const state = {
        router: {
          routeParams,
        },
      };

      expect(routeParamsSelector(state)).toEqual(routeParams);
    });

    test("returns with an empty [] if routeParams is not defined ", () => {
      const state = {
        router: {},
      };

      expect(routeParamsSelector(state)).toEqual([]);
    });
  });
});
