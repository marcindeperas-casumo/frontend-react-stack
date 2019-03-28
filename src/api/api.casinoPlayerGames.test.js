import {
  getGameProviders,
  getCasinoPlayerGames,
  getCasinoPlayerGamesCount,
  URL,
} from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  let http;
  const sessionId = "123";
  const page = 0;
  const pageSize = 100;
  const providers = [];
  const headers = {
    headers: {
      "X-Request-Features": null,
      "X-Token": sessionId,
    },
  };

  beforeEach(() => {
    http = {
      get: jest.fn(() => Promise.resolve([])),
    };
  });

  describe("getCasinoPlayerGamesCount()", () => {
    test("calls http.get() with the right URL for GAMES_COUNT (without params)", () => {
      getCasinoPlayerGamesCount({ sessionId }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URL.GAMES_COUNT, {}, headers);
    });

    test("calls http.get() with the right URL for GAMES_COUNT (with params)", () => {
      getCasinoPlayerGamesCount({ sessionId, providers: ["foo", "bar"] }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES_COUNT,
        { providerSlugs: "foo,bar" },
        headers
      );
    });
  });

  describe("getGameProviders()", () => {
    test("calls http.get() with the right URL", () => {
      getGameProviders({ sessionId }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(URL.GAME_PROVIDERS, {}, headers);
    });
  });

  describe("getCasinoPlayerGames()", () => {
    test("calls http.get() with the right URL", () => {
      getCasinoPlayerGames({ sessionId, page, pageSize, providers }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES,
        { page, pageSize, providerSlugs: "" },
        headers
      );
    });

    test("calls http.get() with the right headers if showDisabledGames is present", () => {
      localStorage.setItem("showDisabledGames", "true");
      getCasinoPlayerGames({ sessionId, page, pageSize, providers }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAMES,
        { page, pageSize, providerSlugs: "" },
        {
          headers: {
            "X-Request-Features": "HIDDEN_GAMES",
            "X-Token": sessionId,
          },
        }
      );
    });
  });
});
