import { CometDFactory } from "../cometd";

describe("CometD", () => {
  const url = "http://foo.com/cometd";
  let cometd;
  let cometdMock;

  beforeEach(() => {
    cometdMock = {
      configure: jest.fn(),
      handshake: jest.fn(cb => cb({ successful: true })),
      subscribe: jest.fn((channel, cb, subscribeProps, subscribeCb) =>
        subscribeCb()
      ),
      unsubscribe: jest.fn((channel, unsubscribeProps, unsubscribeCb) =>
        unsubscribeCb()
      ),
    };
    cometd = CometDFactory(cometdMock);
  });

  describe(".init()", () => {
    test("should call cometd.handshake() on init", async () => {
      await cometd.init({ url });

      expect(cometdMock.handshake.mock.calls.length).toBe(1);
    });

    test("should call cometd.configure() on init", async () => {
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

    test("should parse the message coming down the channel", async () => {
      const callback = jest.fn();
      const data = { foo: "bar" };
      const payload = {
        data: JSON.stringify(data),
      };

      await cometd.subscribe("/channel", callback);
      cometdMock.subscribe.mock.calls[0][1](payload);

      expect(callback.mock.calls[0][0]).toEqual(data);
    });
  });
});
