import {
  getGameProviders,
  getCasinoPlayerGamesCount,
  URL,
} from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  const sessionId = "123";

  describe("getCasinoPlayerGamesCount()", () => {
    test("calls http.get() with the right URL for GAMES_COUNT (without params)", () => {
      const http = { get: jest.fn(() => Promise.resolve([])) };

      localStorage.setItem("showDisabledGames", "true");
      getCasinoPlayerGamesCount({ sessionId }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES_COUNT,
        {},
        {
          headers: {
            "X-Request-Features": "HIDDEN_GAMES",
            "X-Token": sessionId,
          },
        }
      );
    });

    test("calls http.get() with the right URL for GAMES_COUNT (with params)", () => {
      const http = { get: jest.fn(() => Promise.resolve([])) };

      localStorage.setItem("showDisabledGames", "false");
      getCasinoPlayerGamesCount({ sessionId, providers: ["foo", "bar"] }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES_COUNT,
        { providerSlugs: "foo,bar" },
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
    test("calls http.get() with the right URL", () => {
      const http = { get: jest.fn(() => Promise.resolve([])) };

      localStorage.setItem("showDisabledGames", "false");
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
