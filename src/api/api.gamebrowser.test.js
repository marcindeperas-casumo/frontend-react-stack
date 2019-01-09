import {
  URL,
  getGameLists,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
  getGamesBySlugs,
  getLiveCasinoTableById,
} from "./api.gamebrowser";

describe("API/GameBrowser", () => {
  let http;
  const getRequestedUrl = () => http.get.mock.calls[0][0];

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
      expect(getRequestedUrl()).toMatch(`${URL.GAME_LISTS}/desktop/en-gb/123`);
      expect(getRequestedUrl()).toMatch(`?variant=default&page=2&pageSize=10`);
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
      expect(getRequestedUrl()).toMatch(`${URL.GAMES_LATEST_PLAYED}/123`);
      expect(getRequestedUrl()).toMatch(`?numberOfGames=10`);
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
      expect(getRequestedUrl()).toMatch(
        `${URL.GAMES_BY_PROVIDER}/desktop/en-gb`
      );
      expect(getRequestedUrl()).toMatch(
        `?variant=default&providerGameNames=foo`
      );
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
      expect(getRequestedUrl()).toMatch(`${URL.GAMES_BY_SLUGS}/desktop/en-gb`);
      expect(getRequestedUrl()).toMatch(
        `?variant=default&slugs%5B%5D=game1&slugs%5B%5D=game2`
      );
    });
  });

  describe("getLiveCasinoTableById()", () => {
    test("requests the URL with the necessary params", () => {
      getLiveCasinoTableById(
        {
          ids: "12345",
          currency: "EUR",
        },
        http
      );

      expect(http.get).toHaveBeenCalledTimes(1);
      expect(getRequestedUrl()).toMatch(`${URL.LIVE_CASINO}`);
      expect(getRequestedUrl()).toMatch(`?id=12345&currency=EUR`);
    });
  });
});
