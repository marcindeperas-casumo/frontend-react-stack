import { CometdFactory } from "./cometd.service";

describe("Models/Cometd/Service", () => {
  const url = "foo.com";
  const subscription = "12345";
  let cometdService;
  let cometd;

  beforeEach(() => {
    cometd = {
      init: jest.fn(),
      subscribe: jest.fn().mockResolvedValue(subscription),
      unsubscribe: jest.fn().mockResolvedValue(null),
    };
    cometdService = CometdFactory({ cometd, url });
  });

  test("initialises the cometd library", () => {
    expect(cometd.init).toHaveBeenCalledWith({ url });
  });

  test("subscribes to a cometd channel", async () => {
    const channel = "/foo";
    const callback = () => {};

    await cometdService.subscribe(channel, callback);

    expect(cometd.subscribe).toHaveBeenCalledTimes(1);
  });

  test("calls cometd.subscribe for a channel only once", async () => {
    const channel = "/foo";

    await cometdService.subscribe(channel);
    await cometdService.subscribe(channel);
    await cometdService.subscribe(channel);

    expect(cometd.subscribe).toBeCalledTimes(1);
  });

  test("unsubscribes from a channel", async () => {
    const channel = "/foo";

    await cometdService.subscribe(channel);
    await cometdService.unsubscribe(channel);
    await cometdService.subscribe(channel);

    expect(cometd.unsubscribe).toBeCalled();
    expect(cometd.subscribe).toBeCalledTimes(2);
  });

  test("only unsubscribes from a channel if there are no outstanding subscriptions", async () => {
    const channel = "/foo";

    // There are 2 outstanding subscriptions
    await cometdService.subscribe(channel);
    await cometdService.subscribe(channel);

    // Removing the 1st subscription
    await cometdService.unsubscribe(channel);
    expect(cometd.unsubscribe).not.toBeCalled();

    // Removeing the 2nd subscription
    await cometdService.unsubscribe(channel);
    expect(cometd.unsubscribe).toBeCalled();

    expect(cometd.unsubscribe).toBeCalledTimes(1);
  });

  test("exposes a method to send message to a channel", async () => {
    const channel = "/foo";
    const data = { foo: "bar" };
    const callback = jest.fn();

    await cometdService.subscribe(channel, callback);

    cometdService.emit(channel, data);
    expect(callback).toBeCalledWith({ data, channel });
  });

  test(".emit() handles wildcard subscriptions", async () => {
    const subscriptionChannel = "/foo/*";
    const emittedChannel = "/foo/bar";
    const data = { foo: "bar" };
    const callback = jest.fn();

    await cometdService.subscribe(subscriptionChannel, callback);

    cometdService.emit(emittedChannel, data);
    expect(callback).toBeCalledWith({ channel: emittedChannel, data });
  });
});
