import { getCasinoPlayerGameProviders, URL } from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  let http;

  describe("getCasinoPlayerGameProviders()", () => {
    beforeEach(() => {
      http = {
        get: jest.fn(() => Promise.resolve([])),
      };
    });

    test("calls http.get() with the right URL", () => {
      getCasinoPlayerGameProviders(http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URL.GAME_PROVIDERS);
    });
  });
});
