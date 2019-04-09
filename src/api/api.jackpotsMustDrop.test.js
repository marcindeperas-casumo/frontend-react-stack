import { getJackpotsMustDrop, URLS } from "./api.jackpotsMustDrop";

describe("/api/redtiger/jackpots/casumo", () => {
  const http = {
    get: jest.fn(),
  };
  const currency = "EUR";

  describe("getJackpotsMustDrop()", () => {
    test("calls http.get() with the right URL", () => {
      getJackpotsMustDrop({ currency }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        `${URLS.MUSTDROP_JACKPOTS}?currency=${currency}`
      );
    });
  });
});
