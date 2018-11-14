import reducer, { actions } from "Models/handshake";

test("initial state", () => {
  const state = reducer(undefined, {});
  expect(state).toEqual({ app: {}, games: {} });
});

test("updating of app handshake", () => {
  const state = reducer({}, actions.updateHandshake({ app: { foo: "bar" } }));
  expect(state).toMatchObject({ app: { foo: "bar" } });
});

test("updating of games handshake", () => {
  const state = reducer({}, actions.updateHandshake({ games: { foo: "bar" } }));
  expect(state).toMatchObject({ games: { foo: "bar" } });
});
