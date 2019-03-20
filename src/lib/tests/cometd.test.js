import { CometDFactory } from "../cometd";

describe("CometD", () => {
  const url = "http://foo.com/cometd";
  const subscription = "123456789";
  let cometd;
  let cometdMock;

  beforeEach(() => {
    cometdMock = {
      configure: jest.fn(),
      handshake: jest.fn(cb => cb({ successful: true })),
      subscribe: jest.fn((channel, cb, subscribeProps, subscribeCb) => {
        subscribeCb();
        return subscription;
      }),
      unsubscribe: jest.fn((a, b, unsubscribeCb) => unsubscribeCb()),
    };
    cometd = CometDFactory(cometdMock);
  });

  describe(".init()", () => {
    test("should call cometd.handshake() on init", async () => {
      await cometd.init({ url });

      expect(cometdMock.handshake.mock.calls.length).toBe(1);
    });

    test("should call cometd.handshake() only once", async () => {
      await cometd.init({ url });
      await cometd.init({ url });

      expect(cometdMock.handshake.mock.calls.length).toBe(1);
    });

    test("should call cometd.configure() only once", async () => {
      await cometd.init({ url });
      await cometd.init({ url });

      expect(cometdMock.configure.mock.calls.length).toBe(1);
    });
  });

  describe(".subscribe()", () => {
    test("should wait for initialising before doing the subscription", async () => {
      cometd.init = jest.fn();

      await cometd.subscribe("/channel", () => {});

      expect(cometd.init.mock.calls.length).toBe(1);
    });

    test("should resolve with the subscription", async () => {
      const newSubscription = await cometd.subscribe("/channel", () => {});

      expect(newSubscription).toBe(subscription);
    });

    test("should parse the message coming down the channel", async () => {
      const callback = jest.fn();
      const data = { foo: "bar" };
      const payload = {
        data: JSON.stringify(data),
      };

      await cometd.subscribe("/channel", callback);
      const callbackParameter = cometdMock.subscribe.mock.calls[0][1];
      callbackParameter(payload);

      expect(callback).toBeCalledTimes(1);
      expect(callback.mock.calls[0][0].data).toEqual(data);
    });

    test("should pass in the channel name as the second parameter to the callback", async () => {
      const callback = jest.fn();
      const channel = "/foo/bar";
      const data = { foo: "bar" };
      const payload = {
        channel,
        data: JSON.stringify(data),
      };

      await cometd.subscribe("/foo/*", callback);
      const callbackParameter = cometdMock.subscribe.mock.calls[0][1];
      callbackParameter(payload);

      expect(callback).toBeCalledTimes(1);
      expect(callback.mock.calls[0][0].channel).toEqual(channel);
    });
  });

  describe(".unsubscribe()", () => {
    test("should call cometdMock.unsubscribe() with the subscription", async () => {
      await cometd.unsubscribe(subscription);

      expect(cometdMock.unsubscribe.mock.calls.length).toBe(1);
      expect(cometdMock.unsubscribe.mock.calls[0][0]).toBe(subscription);
    });
  });
});
