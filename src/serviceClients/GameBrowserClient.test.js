import { GameBrowserClientFactory } from "Clients/GameBrowserClient";

describe("GameBrowserClientFactory", () => {
  let client;

  const httpService = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    client = GameBrowserClientFactory({ http: httpService });
  });

  describe("handshake()", () => {
    test("should call http service on handshake", () => {
      client.handshake({ country: "mt", platform: "foo" });
      expect(httpService.get).toHaveBeenCalledWith(
        "gamebrowser/handshake/foo/mt"
      );
    });

    test("should return a resolved promise on handshake", async () => {
      httpService.get.mockResolvedValue({ foo: "bar" });
      const response = await client.handshake({ country: "mt" });

      expect(response).toEqual({
        foo: "bar",
      });
    });
  });

  describe("gameList()", () => {
    test("should call the http service on gamesList", async () => {
      client.gamesLists({
        country: "mt",
        platform: "foo",
        id: "abc",
        variant: "default",
        page: 1,
        pageSize: 2,
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        "gamebrowser/games-lists/foo/mt/abc?variant=default&page=1&pageSize=2"
      );
    });

    test("should call the http service with page = 0, pageSize = 5 and variant null on gamesList by default", async () => {
      client.gamesLists({
        country: "mt",
        platform: "foo",
        id: "abc",
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        // Q: should the client have a default page value? The backend already have one
        "gamebrowser/games-lists/foo/mt/abc?page=0&pageSize=5"
      );
    });
  });

  describe("latestPlayedGames()", () => {
    test("should call http service on latestPlayedGames", async () => {
      await client.latestPlayedGames({ playerId: "123", pageSize: 2 });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        // Q: should the client have a default page value? The backend already have one
        "gamebrowser/latestPlayedGames/player/123?numberOfGames=2"
      );
    });

    test("should call http service with pageSize = 5 by default on latestPlayedGames", async () => {
      await client.latestPlayedGames({ playerId: "uuid" });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/latestPlayedGames/player/uuid?numberOfGames=5"
      );
    });
  });

  describe("gamesByProviderGameNames()", () => {
    test("should call http service on gamesByProviderGameNames", async () => {
      await client.gamesByProviderGameNames({
        platform: "foo",
        country: "mt",
        providerGameNames: ["netend", "quickspin"],
        variant: "default",
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/games-by-provider-game-names/foo/mt?variant=default&providerGameNames%5B%5D=netend&providerGameNames%5B%5D=quickspin"
      );
    });

    test("should call http service without query params by default on gamesByProviderGameNames", async () => {
      await client.gamesByProviderGameNames({
        platform: "foo",
        country: "mt",
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/games-by-provider-game-names/foo/mt?"
      );
    });
  });

  describe("gamesBySlugs()", () => {
    test("should call http service on gamesBySlugs", async () => {
      await client.gamesBySlugs({
        platform: "foo",
        country: "mt",
        slugs: ["foo", "bar"],
        variant: "default",
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/games-by-slugs/foo/mt?variant=default&slugs%5B%5D=foo&slugs%5B%5D=bar"
      );
    });

    test("should call http service without query params by default on gamesBySlugs", async () => {
      await client.gamesBySlugs({ platform: "foo", country: "mt" });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/games-by-slugs/foo/mt?"
      );
    });
  });

  describe("iveCasinoTablesById()", () => {
    test("should call http service on liveCasinoTablesById", async () => {
      await client.liveCasinoTablesById({
        ids: ["foo", "bar"],
        currency: "EUR",
      });

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/liveCasino/tablesById?id%5B%5D=foo&id%5B%5D=bar&currency=EUR"
      );
    });

    //Q: Should this fail? I reckon not passing an Id is a valid case.
    test.skip("should call http service without query params by default on liveCasinoTablesById", async () => {
      await client.liveCasinoTablesById();

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toBeCalledWith(
        "gamebrowser/liveCasino/tablesById?"
      );
    });
  });
});
