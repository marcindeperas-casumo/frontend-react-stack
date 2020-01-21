import { menuReducer } from "./menu.reducer";

describe("menu reducer", () => {
  test("initial state is closed", () => {
    const state = menuReducer(undefined, {});
    expect(state).toEqual({ open: false });
  });

  test("menu open", () => {
    const action = { type: "MENU/OPEN" };
    const state = menuReducer({}, action);
    expect(state).toMatchObject({ open: true });
  });

  test("menu closed", () => {
    const action = { type: "MENU/CLOSED" };
    const state = menuReducer({}, action);
    expect(state).toMatchObject({ open: false });
  });
});
