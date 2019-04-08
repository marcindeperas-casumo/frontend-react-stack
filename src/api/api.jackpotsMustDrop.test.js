import { httpMock } from "Utils";
import { getJackpotsMustDrop, URLS } from "./api.jackpotsMustDrop";

describe("/api/redtiger/jackpots/casumo", () => {
  const currency = "EUR";

  describe("getJackpotsMustDrop()", () => {
    test("calls http.get() with the right URL", () => {
      getJackpotsMustDrop({ currency }, httpMock);

      expect(httpMock.get).toHaveBeenCalledTimes(1);
      expect(httpMock.get).toHaveBeenCalledWith(
        `${URLS.MUSTDROP_JACKPOTS}?currency=${currency}`
      );
    });
  });
});
