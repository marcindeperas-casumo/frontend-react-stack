import * as actions from "./handshake.actions";
import reducer from "./handshake.reducer";

test("initial state", () => {
  const state = reducer(undefined, {});
  expect(state).toEqual({ app: {} });
});

test("updating of app handshake", () => {
  const state = reducer({}, actions.updateHandshake({ app: { foo: "bar" } }));
  expect(state).toMatchObject({ app: { foo: "bar" } });
});
