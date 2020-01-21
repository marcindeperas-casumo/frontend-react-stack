import { sidebarReducer } from "./sidebar.reducer";

describe("menu reducer", () => {
  test("initial state is closed", () => {
    const state = sidebarReducer(undefined, {});
    expect(state).toEqual({ open: false });
  });

  test("menu open", () => {
    const action = { type: "MENU/OPEN" };
    const state = sidebarReducer({}, action);
    expect(state).toMatchObject({ open: true });
  });

  test("menu closed", () => {
    const action = { type: "MENU/CLOSED" };
    const state = sidebarReducer({}, action);
    expect(state).toMatchObject({ open: false });
  });
});
