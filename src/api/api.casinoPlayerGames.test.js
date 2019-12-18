import {
  getGameProviders,
  getCasinoPlayerGames,
  getCasinoPlayerGamesCount,
  getCasinoPlayerGameSearch,
  getCasinoPlayerGameSearchCount,
  URL,
} from "./api.casinoPlayerGames";

describe("API/casinoPlayerGames", () => {
  let http;
  const sessionId = "123";
  const page = 0;
  const pageSize = 100;
  const query = "hola";
  const providers = [];
  const headers = {
    headers: {
      "X-Request-Features": null,
      "X-Token": sessionId,
      "Content-Type": "application/json",
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
        { studioSlugs: "foo,bar" },
        headers
      );
    });
  });

  describe("getCasinoPlayerGameSearch()", () => {
    test("calls http.get() with the right URL for GAME_SEARCH with params", () => {
      getCasinoPlayerGameSearch({ page, pageSize, sessionId, query }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAME_SEARCH,
        { page, pageSize, query },
        headers
      );
    });
  });

  describe("getCasinoPlayerGameSearchCount()", () => {
    test("calls http.get() with the right URL and params", () => {
      getCasinoPlayerGameSearchCount({ sessionId, query }, http);

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(http.get).toHaveBeenCalledWith(
        URL.GAME_SEARCH_COUNT,
        { query },
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
        { page, pageSize, studioSlugs: "" },
        headers
      );
    });

    test("calls http.get() with the right headers if showDisabledGames is present", () => {
      localStorage.setItem("showDisabledGames", "true");
      getCasinoPlayerGames({ sessionId, page, pageSize, providers }, http);

      const requestHeaders = http.get.mock.calls[0][2].headers;

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(requestHeaders).toMatchObject({
        "X-Request-Features": "HIDDEN_GAMES",
      });
    });
  });
});
