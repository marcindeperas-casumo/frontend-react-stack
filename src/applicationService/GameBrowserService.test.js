import gameBrowserClientMock from "../serviceClients/GameBrowserClient";
import sessionServiceMock from "../applicationService/SessionService";
import {
  GameBrowserServiceFactory,
  gameInMaintenanceMode,
} from "./GameBrowserService";
jest.mock("../serviceClients/GameBrowserClient");
jest.mock("../applicationService/SessionService");

describe("Game Browser Service", () => {
  let service;

  beforeEach(() => {
    service = GameBrowserServiceFactory({
      gameBrowserClient: gameBrowserClientMock,
      sessionService: sessionServiceMock,
    });

    jest.resetAllMocks();

    gameBrowserClientMock.handshake.mockResolvedValue({
      gamesLists: {
        "top-list-1": {
          id: "top-list-1",
          title: "Top List 1",
          variants: {
            default: {
              totalGames: 10,
              hash: "top-list-hash-default-variant",
            },
            guests: { totalGames: 5, hash: "top-list-hash-guests-variant" },
          },
        },
      },
      topListIds: ["top-list-1", "top-list-2"],
    });

    gameBrowserClientMock.gamesLists.mockImplementation(x =>
      Promise.resolve({ games: ["game-1"] })
    );

    service.config.set({ country: "mt", device: "mobile" });
  });

  // afterEach(() => {
  //   console.log(gameBrowserClientMock.handshake.mock.calls);
  // });

  test("should call handshake on client", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalled();
  });

  test("should call handshake once", async () => {
    await service.allTopLists();
    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(1);
  });

  test("should re call handshake if it is invalidated", async () => {
    await service.allTopLists();
    await service.invalidateHandshake();
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(2);
  });

  test("should pull the country from the config", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt",
      })
    );
  });

  test("should call handshake with different country if config is changed", async () => {
    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt",
      })
    );

    service.config.set({ country: "gb" });

    await service.allTopLists();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "gb",
      })
    );
  });

  describe("allTopLists()", () => {
    test("should call gamesList API with the relevant parameters", async () => {
      service.config.set({ country: "mt", device: "mobile" });
      await service.allTopLists();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalled();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: "mobile",
          country: "mt",
          id: "top-list-1",
          hash: "top-list-hash-default-variant",
          variant: "default",
          pageSize: 20,
        })
      );
    });

    test("should return all top lists", async () => {
      const response = await service.allTopLists();
      expect(response).toEqual([
        { id: "top-list-1", title: "Top List 1", games: ["game-1"] },
      ]);
    });

    test("should ignore topListId if it does not exists in gamesLists", async () => {
      const response = await service.allTopLists();
      expect(response).not.toBeUndefined();
    });

    test("should not return lists with no games", async () => {
      gameBrowserClientMock.gamesLists.mockResolvedValue({ games: [] });

      const response = await service.allTopLists();
      expect(response).toEqual([]);
    });

    test("should not blow up if games is not an array", async () => {
      gameBrowserClientMock.gamesLists.mockResolvedValue({});
      await service.allTopLists();
    });
  });

  describe("latestPlayedGames", () => {
    beforeEach(() => {
      gameBrowserClientMock.handshake.mockResolvedValue({
        gamesLists: {
          "top-list-1": {
            id: "top-list-1",
            title: "Top List 1",
            variants: {
              default: {
                totalGames: 10,
                hash: "top-list-hash-default-variant",
              },
              guests: { totalGames: 5, hash: "top-list-hash-guests-variant" },
            },
          },
          allGames: {
            id: "allGames",
            title: "allGames",
            variants: {
              default: {
                totalGames: 10,
                hash: "top-list-hash-default-variant",
              },
              guests: { totalGames: 5, hash: "top-list-hash-guests-variant" },
            },
          },
          latestPlayedGames: {
            id: "latestPlayedGames",
            title: "Latest Played Games",
            variants: {
              default: {
                totalGames: 10,
                hash: "top-list-hash-default-variant",
              },
              guests: { totalGames: 5, hash: "top-list-hash-guests-variant" },
            },
          },
        },
        topListIds: ["top-list-1", "latestPlayedGames"],
      });

      gameBrowserClientMock.latestPlayedGames.mockResolvedValue([
        { gameName: "game-id-1" },
      ]);

      gameBrowserClientMock.gamesByProviderGameNames.mockResolvedValue({
        games: [
          {
            name: "Fake Game",
          },
        ],
      });
    });

    test("should call gamesByProviderGameNames with the player's latest played games", async () => {
      await service.latestPlayedGames();

      expect(gameBrowserClientMock.gamesByProviderGameNames).toBeCalledWith(
        expect.objectContaining({
          providerGameNames: ["game-id-1"],
        })
      );
    });

    test("should return the latest played games", async () => {
      expect(await service.latestPlayedGames()).toEqual({
        id: "latestPlayedGames",
        title: "Latest Played Games",
        games: [
          {
            name: "Fake Game",
          },
        ],
      });
    });

    test("should not call gamesByProviderGameNames if player has no latest played games", async () => {
      gameBrowserClientMock.latestPlayedGames.mockResolvedValue([]);
      await service.latestPlayedGames();
      expect(
        gameBrowserClientMock.gamesByProviderGameNames
      ).not.toHaveBeenCalled();
    });
  });

  describe("gameInMaintenanceMode()", () => {
    test("should filter games in maintenance mode", () => {
      expect(
        [
          {
            name: "game 1",
            inMaintenanceMode: true,
          },
          {
            name: "game 2",
            inMaintenanceMode: false,
          },
        ].filter(gameInMaintenanceMode)
      ).toEqual([
        expect.objectContaining({
          name: "game 1",
        }),
      ]);
    });
  });
});
