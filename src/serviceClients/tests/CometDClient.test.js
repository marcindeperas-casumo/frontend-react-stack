import cometd from "../../lib/cometd";
import { CometDClientFactory } from "../CometDClient";

jest.mock("../../lib/cometd");

describe("CometDClient", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    CometDClientFactory();
  });

  test("should initialise cometd", () => {
    expect(cometd.init.mock.calls.length).toBe(1);
  });

  test("should pass a url to cometd.init()", () => {
    const args = cometd.init.mock.calls[0][0];
    const { url } = args;

    expect(typeof url === "string").toBe(true);
  });
});
