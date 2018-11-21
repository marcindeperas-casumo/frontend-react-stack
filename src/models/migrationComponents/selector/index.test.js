import {
  migrationComponentsSelector,
  activeComponents,
  routeParamsSelector,
} from "Models/migrationComponents/selector";
describe("Migration component selector", () => {
  test("migrationComponentsSelector", () => {
    const state = {
      migrationComponents: { foo: "bar " },
    };

    expect(migrationComponentsSelector(state)).toEqual({ foo: "bar " });
  });

  test("activeComponents", () => {
    const state = {
      migrationComponents: {
        activeComponents: ["a"],
      },
    };

    expect(activeComponents(state)).toEqual(["a"]);
  });

  test("activeComponents return empty array if nothing is set in the state", () => {
    const state = {
      migrationComponents: {},
    };

    expect(activeComponents(state)).toEqual([]);
  });

  describe("routeParamsSelector()", () => {
    test("returns with the routeParams object", () => {
      const routeParams = { foo: "bar" };
      const state = {
        migrationComponents: {
          routeParams,
        },
      };

      expect(routeParamsSelector(state)).toEqual(routeParams);
    });

    test("returns with an empty {} if routeParams is not defined ", () => {
      const state = {
        migrationComponents: {},
      };

      expect(routeParamsSelector(state)).toEqual({});
    });
  });
});
