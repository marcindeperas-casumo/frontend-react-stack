import { getCommonHandshake, URLS } from "./api.common";

describe("API/Common", () => {
  describe("getCommonHandshake()", () => {
    const http = {
      get: jest.fn(),
    };

    test("calls http.get() with the right URL", () => {
      getCommonHandshake(http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URLS.HANDSHAKE);
    });
  });
});
