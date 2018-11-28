import { TYPES } from "./cometd.constants";
import { takeChannel } from "./cometd.saga.utils";

describe("Models/CometD/Saga-Utils", () => {
  test("only returns true if it is the target channel", () => {
    const channel = "/foo/bar";
    const matchingMessage = { type: TYPES.COMETD_MESSAGE, channel };
    const unknownMessage = { type: TYPES.COMETD_MESSAGE, channel: "/unknown" };

    expect(takeChannel(channel)(matchingMessage)).toBe(true);
    expect(takeChannel(channel)(unknownMessage)).toBe(false);
  });

  test("handles wildcard channels", () => {
    const channel = "/foo/*";
    const matchingMessage = { type: TYPES.COMETD_MESSAGE, channel: "/foo/bar" };
    const unknownMessage = { type: TYPES.COMETD_MESSAGE, channel: "/unknown" };

    expect(takeChannel(channel)(matchingMessage)).toBe(true);
    expect(takeChannel(channel)(unknownMessage)).toBe(false);
  });
});
