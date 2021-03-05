import { prop, compose } from "ramda";
import { message } from "Models/cometd/cometd.actions";
import cometdSubscribeSaga, {
  getCometdMessagesStream,
} from "./cometd.subscribe.saga";

describe("Models/CometD/Subscribe", () => {
  const channel = "/foo/*";
  const sessionId = "foobar";
  const emittedChannel = "/foo/bar";
  const generator = cometdSubscribeSaga({ channel, sessionId });
  const fakeMessageStream = "PATTERN";
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
  const isGeneratorDone = (...args) => generator.next(...args).done;

  test("requests for creating a message stream", () => {
    const effect = generator.next();
    const CALL = compose(prop("CALL"), prop("value"))(effect);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    const fn = prop("fn")(CALL);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    const fnArgs = prop("args")(CALL);

    expect(fn).toEqual(getCometdMessagesStream);
    expect(fnArgs).toEqual([channel, { sessionId }]);
  });

  test("relays messages on the store", () => {
    const data = { foo: "bar" };
    const expectedAction = message({ channel: emittedChannel, data });

    // We are "yielding" the take() and passing down the message stream
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '[string]' is not assignable to p... Remove this comment to see the full error message
    generator.next(fakeMessageStream);

    // Push message (would come from the message stream) and get the result of put()
    const effect = generator.next({ channel: emittedChannel, data });
    const PUT = compose(prop("PUT"), prop("value"))(effect);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    const action = prop("action")(PUT);

    expect(action).toEqual(expectedAction);
  });

  test("does not stop after receiving a message", () => {
    expect(isGeneratorDone()).toBe(false);
  });
});
