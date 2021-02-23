import reducer from "./router.reducer";
import { activateComponent } from "./router.actions";

describe("Models/Router/Reducer", () => {
  test("activate a component", () => {
    const state = {
      activeComponents: [],
    };
    const result = reducer(state, activateComponent({ componentId: "foo" }));
    expect(result.activeComponents).toEqual(["foo"]);
  });

  test("activeComponents are uniq", () => {
    const state = {
      activeComponents: [],
    };

    const result = reducer(
      reducer(state, activateComponent({ componentId: "foo" })),
      activateComponent({ componentId: "foo" })
    );

    expect(result.activeComponents).toEqual(["foo"]);
  });

  test("sets the routeParams if they are specified", () => {
    const defaultState = {
      activeComponents: [],
      routeParams: ["foo"],
    };
    const routeParams = ["bar", "foo"];
    const state = reducer(
      defaultState,
      activateComponent({ componentId: "foo", routeParams })
    );

    expect(state.routeParams).toEqual(routeParams);
  });

  test("clears the routeParams if they are not specified", () => {
    const defaultState = {
      activeComponents: [],
      routeParams: ["foo"],
    };
    const state = reducer(
      defaultState,
      activateComponent({ componentId: "foo" })
    );

    expect(state.routeParams).toEqual([]);
  });
});
