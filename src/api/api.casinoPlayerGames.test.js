import {
  getGameProviders,
  getCasinoPlayerGamesCount,
  URL,
} from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  let http;
  const sessionId = "123";

  describe("getCasinoPlayerGamesCount()", () => {
    beforeEach(() => {
      http = {
        get: jest.fn(() => Promise.resolve([])),
      };
    });

    test("calls http.get() with the right URL for GAMES_COUNT", () => {
      getCasinoPlayerGamesCount({ sessionId }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES_COUNT,
        {},
        {
          headers: {
            "X-Request-Features": null,
            "X-Token": sessionId,
          },
        }
      );
    });
  });

  describe("getGameProviders()", () => {
    // eslint-disable-next-line sonarjs/no-identical-functions
    beforeEach(() => {
      http = {
        get: jest.fn(() => Promise.resolve([])),
      };
    });

    test("calls http.get() with the right URL", () => {
      getGameProviders({ sessionId }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAME_PROVIDERS,
        {},
        {
          headers: {
            "X-Request-Features": null,
            "X-Token": sessionId,
          },
        }
      );
    });
  });
});
