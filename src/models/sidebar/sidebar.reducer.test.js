import { sidebarReducer } from "./sidebar.reducer";
import { sidebarOpenAction, sidebarCloseAction } from "./sidebar.actions";

describe("sidebar reducer", () => {
  test("initial state is closed", () => {
    const state = sidebarReducer(undefined, {});
    expect(state).toEqual({ open: false });
  });

  test("sidebar is OPEN if sidebarCloseAction is dispatched", () => {
    const state = sidebarReducer({}, sidebarOpenAction());
    expect(state).toMatchObject({ open: true });
  });

  test("sidebar is CLOSED if sidebarCloseAction is dispatched", () => {
    const state = sidebarReducer({}, sidebarCloseAction());
    expect(state).toMatchObject({ open: false });
  });
});
