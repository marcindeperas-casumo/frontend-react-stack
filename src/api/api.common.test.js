import { getHandshake, URLS } from "./api.common";

describe("API/Common", () => {
  const http = {
    get: jest.fn(),
  };

  describe("getHandshake()", () => {
    test("calls http.get() with the right URL", () => {
      getHandshake(http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URLS.HANDSHAKE);
    });
  });
});
