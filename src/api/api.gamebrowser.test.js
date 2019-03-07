import {
  URL,
  getGameLists,
  getQuerySearch,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
  getGamesBySlugs,
  getLiveCasinoTable,
} from "./api.gamebrowser";

describe("API/GameBrowser", () => {
  let http;
  const getRequestUrl = () => http.get.mock.calls[0][0];
  const getRequestData = () => http.get.mock.calls[0][1];

  beforeEach(() => {
    http = {
      get: jest.fn(),
    };
  });

  describe("getGameLists()", () => {
    test("requests the URL with the necessary params", () => {
      getGameLists(
        {
          platform: "desktop",
          country: "en-gb",
          id: "123",
          variant: "default",
          page: 2,
          pageSize: 10,
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.GAME_LISTS}/desktop/en-gb/123`);
      expect(getRequestData()).toMatchObject({
        variant: "default",
        page: 2,
        pageSize: 10,
      });
    });
  });

  describe("getQuerySearch()", () => {
    test("requests the URL with the necessary params", () => {
      getQuerySearch(
        {
          platform: "mobile",
          country: "en-gb",
          query: "starburst",
          variant: "default",
          page: 0,
          pageSize: 5,
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.GAME_SEARCH}/mobile/en-gb`);
      expect(getRequestData()).toMatchObject({
        variant: "default",
        page: 0,
        pageSize: 5,
        q: "starburst",
      });
    });
  });

  describe("getLatestPlayedGames()", () => {
    test("requests the URL with the necessary params", () => {
      getLatestPlayedGames(
        {
          playerId: "123",
          pageSize: 10,
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.GAMES_LATEST_PLAYED}/123`);
      expect(getRequestUrl()).toMatch(`?numberOfGames=10`);
    });
  });

  describe("getGamesByProviderGameNames()", () => {
    test("requests the URL with the necessary params", () => {
      getGamesByProviderGameNames(
        {
          platform: "desktop",
          country: "en-gb",
          variant: "default",
          providerGameNames: "foo",
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.GAMES_BY_PROVIDER}/desktop/en-gb`);
      expect(getRequestData()).toMatchObject({
        variant: "default",
        providerGameNames: "foo",
      });
    });
  });

  describe("getGamesBySlugs()", () => {
    test("requests the URL with the necessary params", () => {
      getGamesBySlugs(
        {
          platform: "desktop",
          country: "en-gb",
          variant: "default",
          slugs: ["game1", "game2"],
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.GAMES_BY_SLUGS}/desktop/en-gb`);
      expect(getRequestData()).toMatchObject({
        variant: "default",
        slugs: ["game1", "game2"],
      });
    });
  });

  describe("getLiveCasinoTable()", () => {
    test("requests the URL with the necessary params", () => {
      getLiveCasinoTable(
        {
          ids: ["123", "456"],
          currency: "EUR",
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestUrl()).toMatch(`${URL.LIVE_CASINO}`);
      expect(getRequestData()).toMatchObject({
        id: ["123", "456"],
        currency: "EUR",
      });
    });
  });
});
