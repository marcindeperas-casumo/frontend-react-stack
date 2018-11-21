import { reducer, actions } from "Models/migrationComponents";

describe("Reducer MigrationComponents", () => {
  test("activate a component", () => {
    const state = {
      activeComponents: [],
    };
    const result = reducer(
      state,
      actions.activateComponent({ componentId: "foo" })
    );
    expect(result.activeComponents).toEqual(["foo"]);
  });

  test("activeComponents are uniq", () => {
    const state = {
      activeComponents: [],
    };

    const result = reducer(
      reducer(state, actions.activateComponent({ componentId: "foo" })),
      actions.activateComponent({ componentId: "foo" })
    );

    expect(result.activeComponents).toEqual(["foo"]);
  });

  test("sets the routeParams if they are specified", () => {
    const defaultState = {
      activeComponents: [],
      routeParams: { foo: "bar" },
    };
    const routeParams = { bar: "foo" };
    const state = reducer(
      defaultState,
      actions.activateComponent({ componentId: "foo", routeParams })
    );

    expect(state.routeParams).toEqual(routeParams);
  });

  test("clears the routeParams if they are not specified", () => {
    const defaultState = {
      activeComponents: [],
      routeParams: { foo: "bar" },
    };
    const state = reducer(
      defaultState,
      actions.activateComponent({ componentId: "foo" })
    );

    expect(state.routeParams).toEqual({});
  });
});
