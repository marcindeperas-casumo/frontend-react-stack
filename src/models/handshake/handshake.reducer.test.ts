import * as actions from "./handshake.actions";
import reducer from "./handshake.reducer";

test("initial state", () => {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
  const state = reducer(undefined, {});
  expect(state).toEqual({ app: {} });
});

test("updating of app handshake", () => {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
  const state = reducer({}, actions.updateHandshake({ app: { foo: "bar" } }));
  expect(state).toMatchObject({ app: { foo: "bar" } });
});
