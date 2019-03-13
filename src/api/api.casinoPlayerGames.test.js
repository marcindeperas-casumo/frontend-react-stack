import { getGameProviders, URL } from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  let http;

  describe("getGameProviders()", () => {
    beforeEach(() => {
      http = {
        get: jest.fn(() => Promise.resolve([])),
      };
    });

    test("calls http.get() with the right URL", () => {
      getGameProviders(http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URL.GAME_PROVIDERS);
    });
  });
});
