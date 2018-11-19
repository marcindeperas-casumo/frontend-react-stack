import { reducer, actions } from "Models/migrationComponents";

describe("Reducer MigrationComponents", () => {
  test("activate a component", () => {
    const state = {
      activeComponents: [],
    };
    const result = reducer(state, actions.activateComponent("foo"));
    expect(result.activeComponents).toEqual(["foo"]);
  });

  test("activeComponents are uniq", () => {
    const state = {
      activeComponents: [],
    };

    const result = reducer(
      reducer(state, actions.activateComponent("foo")),
      actions.activateComponent("foo")
    );

    expect(result.activeComponents).toEqual(["foo"]);
  });
});
