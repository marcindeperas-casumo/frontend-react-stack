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
  const isGeneratorDone = (...args) => generator.next(...args).done;

  test("requests for creating a message stream", () => {
    const effect = generator.next();
    const CALL = compose(
      prop("CALL"),
      prop("value")
    )(effect);
    const fn = prop("fn")(CALL);
    const fnArgs = prop("args")(CALL);

    expect(fn).toEqual(getCometdMessagesStream);
    expect(fnArgs).toEqual([channel, { sessionId }]);
  });

  test("relays messages on the store", () => {
    const data = { foo: "bar" };
    const expectedAction = message({ channel: emittedChannel, data });

    // We are "yielding" the take() and passing down the message stream
    generator.next(fakeMessageStream);

    // Push message (would come from the message stream) and get the result of put()
    const effect = generator.next({ channel: emittedChannel, data });
    const PUT = compose(
      prop("PUT"),
      prop("value")
    )(effect);
    const action = prop("action")(PUT);

    expect(action).toEqual(expectedAction);
  });

  test("does not stop after receiving a message", () => {
    expect(isGeneratorDone()).toBe(false);
  });
});
