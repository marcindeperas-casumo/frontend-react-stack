import { reducer } from "Models/session";

const action = {
  type: "COMETD/MESSAGE",
  channel: "/session/d1be3423-d26e-4ce3-88c4-1916289ffb9b/ended",
  data: "TakenOver",
};

test("initial state", () => {
  const state = reducer(undefined, {});
  expect(state).toEqual({ valid: true });
});

test("update session", () => {
  const state = reducer({}, action);
  expect(state).toMatchObject({ valid: false });
});
