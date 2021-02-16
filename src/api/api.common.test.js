import { getCommonHandshake, URLS } from "./api.common";

describe("API/Common", () => {
  const http = {
    post: jest.fn(),
  };

  describe("getCommonHandshake()", () => {
    test("calls http.post() with the right URL", () => {
      getCommonHandshake(http);

      expect(http.post).toHaveBeenCalledTimes(1);
      expect(http.post).toHaveBeenCalledWith(URLS.HANDSHAKE, {
        url: window?.location.href,
        trackingId: null,
      });
    });
  });
});
