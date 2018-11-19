import {
  migrationComponentsSelector,
  activeComponents,
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
});
