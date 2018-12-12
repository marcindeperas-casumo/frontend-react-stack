import gameBrowserClientMock from "Clients/GameBrowserClient";
import sessionServiceMock from "Services/SessionService";
import {
  GameBrowserServiceFactory,
  gameInMaintenanceMode,
} from "./GameBrowserService";
jest.mock("../serviceClients/GameBrowserClient");
jest.mock("../applicationService/SessionService");

describe("Game Browser Service", () => {
  describe("GameBrowserServiceFactory", () => {
    let service;
    beforeEach(() => {
      service = GameBrowserServiceFactory({
        gameBrowserClient: gameBrowserClientMock,
        sessionService: sessionServiceMock,
      });

      jest.resetAllMocks();
    });

    describe("config()", () => {
      test("should set the default config to platform = mobile", async () => {
        service.config.set({});

        expect(service.config.get()).toEqual({
          platform: "mobile",
        });
      });
    });

    describe("allTopLists()", () => {
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
          },
          topListIds: ["top-list-1", "top-list-2"],
        });

        gameBrowserClientMock.gamesLists.mockImplementation(x =>
          Promise.resolve({ games: ["game-1"] })
        );

        service.config.set({ country: "mt", platform: "mobile" });
      });

      test("should call handshake once", async () => {
        await service.allTopLists();
        await service.allTopLists();
        expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(1);
      });

      test("should re call handshake if it is invalidated", async () => {
        await service.allTopLists();
        await service.invalidateHandshake();
        await service.allTopLists();

        expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(2);
      });

      test("should call handshake with the country from the config", async () => {
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

      test("should call gamesList API with the relevant parameters", async () => {
        service.config.set({ country: "mt", platform: "desktop" });
        await service.allTopLists();
        expect(gameBrowserClientMock.gamesLists).toHaveBeenCalledWith(
          expect.objectContaining({
            platform: "desktop",
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
        gameBrowserClientMock.gamesLists.mockResolvedValue({ games: [] });

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
        const response = await service.allTopLists();
        expect(response).toEqual([]);
      });
    });

    describe("latestPlayedGames()", () => {
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
        });

        gameBrowserClientMock.gamesByProviderGameNames.mockResolvedValue({
          games: [
            {
              name: "Fake Game",
            },
          ],
        });
        service.config.set({ country: "mt" });
      });

      test("should call gamesByProviderGameNames with the player's latest played games", async () => {
        gameBrowserClientMock.latestPlayedGames.mockResolvedValue([
          { gameName: "game-id-1" },
        ]);

        await service.latestPlayedGames();

        expect(gameBrowserClientMock.gamesByProviderGameNames).toBeCalledWith(
          expect.objectContaining({
            providerGameNames: ["game-id-1"],
          })
        );
      });

      test("should return the latest played games", async () => {
        gameBrowserClientMock.latestPlayedGames.mockResolvedValue([
          { gameName: "game-id-1" },
        ]);
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

    describe("gamesBySlugs()", () => {
      beforeEach(() => {
        gameBrowserClientMock.handshake.mockResolvedValue({
          gamesLists: {
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
          },
        });
      });

      it("should call GameBrowserClient.gamesBySlugs with the arguments passed in", async () => {
        service.config.set({ country: "gb", platform: "desktop" });

        await service.gamesBySlugs({
          variant: "guests",
          slugs: ["my-first-slug", "my-second-slug"],
        });

        expect(gameBrowserClientMock.gamesBySlugs).toBeCalledWith({
          country: "gb",
          platform: "desktop",
          hash: "top-list-hash-guests-variant",
          variant: "guests",
          slugs: ["my-first-slug", "my-second-slug"],
        });
      });

      it("should call gamesBySlugs with variant = 'default' as default", async () => {
        service.config.set({ country: "de", platform: "desktop" });

        await service.gamesBySlugs({});

        expect(gameBrowserClientMock.gamesBySlugs).toBeCalledWith({
          country: "de",
          platform: "desktop",
          hash: "top-list-hash-default-variant",
          slugs: undefined, //Q: is this ok?
          variant: "default",
        });
      });
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
