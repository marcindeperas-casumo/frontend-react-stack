import { prop, compose } from "ramda";
import cometd from "Models/cometd/cometd.service";
import cometdUnsubscribeSaga from "./cometd.unsubscribe.saga";

describe("Models/CometD/Unsubscribe", () => {
  const channel = "/foo/bar";
  const action = { channel };
  const generator = cometdUnsubscribeSaga(action);
  const isGeneratorDone = (...args) => generator.next(...args).done;

  test("calls cometd.unsubscribe with the channel name", () => {
    const effect = generator.next();
    const FORK = compose(
      prop("FORK"),
      prop("value")
    )(effect);
    const fn = prop("fn")(FORK);
    const fnArgs = prop("args")(FORK);

    expect(fn).toEqual(cometd.unsubscribe);
    expect(fnArgs).toEqual([channel]);
  });

  test("stops after unsubscribing", () => {
    expect(isGeneratorDone()).toBe(true);
  });
});
