import { getCommonHandshake, URLS } from "./api.common";

describe("API/Common", () => {
  const http = {
    post: jest.fn(),
  };

  describe("getCommonHandshake()", () => {
    test("calls http.post() with the right URL", () => {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ post: jest.Mock<any, any>; }' ... Remove this comment to see the full error message
      getCommonHandshake(http);

      expect(http.post).toHaveBeenCalledTimes(1);
      expect(http.post).toHaveBeenCalledWith(URLS.HANDSHAKE, {
        referrerUrl: document?.referrer,
        trackingId: null,
        url: window?.location.href,
      });
    });
  });
});
