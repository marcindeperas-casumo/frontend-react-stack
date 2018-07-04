import gameBrowserClientMock from "../service-clients/GameBrowserClient";
import service from "./GameBrowserService";
jest.mock("../service-clients/GameBrowserClient");

describe("Game Browser Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    gameBrowserClientMock.getById.mockImplementation(({ id, hash }) =>
      Promise.resolve({ id, hash, topListIds: [id] })
    );

    gameBrowserClientMock.handshake.mockResolvedValue({
      topListIds: [1, 2],
      hash: {
        i1: "hash-1",
        i2: "hash-2"
      }
    });
    service.config.set({ country: "mt", device: "mobile" });
  });

  // afterEach(() => {
  //   console.log(gameBrowserClientMock.handshake.mock.calls);
  // });

  test("should return ids", async () => {
    const response = await service.getIds();
    expect(response).toEqual([
      { id: 1, hash: "hash-1" },
      { id: 2, hash: "hash-2" }
    ]);
  });

  test("should call handshake on client", async () => {
    await service.getAll();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalled();
  });

  test("should return all products", async () => {
    const response = await service.getAll();

    expect(response).toEqual([
      { id: 1, hash: "hash-1", topListIds: [1] },
      { id: 2, hash: "hash-2", topListIds: [2] }
    ]);

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(1);
  });

  test("should re call handshake if it is invalidated", async () => {
    const response = await service.getAll();
    expect(response).toEqual([
      { id: 1, hash: "hash-1", topListIds: [1] },
      { id: 2, hash: "hash-2", topListIds: [2] }
    ]);

    gameBrowserClientMock.handshake.mockResolvedValue({
      topListIds: [3],
      hash: {
        i3: "hash-3"
      }
    });

    await service.invalidateHandshake();
    const responseAfterUpdate = await service.getAll();
    expect(responseAfterUpdate).toEqual([
      { id: 3, hash: "hash-3", topListIds: [3] }
    ]);
    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(2);
  });

  test("should pull the country from the session service", async () => {
    await service.getIds();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt"
      })
    );
  });

  test("should call handshake with different country if config is changed", async () => {
    await service.getIds();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "mt"
      })
    );

    service.config.set({ country: "gb" });

    await service.getIds();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "gb"
      })
    );
  });

  /*========*/
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
                hash: "top-list-hash-default-variant"
              },
              guests: { totalGames: 5, hash: "top-list-hash-guests-variant" }
            }
          }
        },
        topListIds: ["top-list-1", "top-list-2"]
      });

      gameBrowserClientMock.gamesLists.mockImplementation(x =>
        Promise.resolve({ games: ["game-1"] })
      );
    });

    test("should call gamesList API with the relevant parameters", async () => {
      await service.allTopLists();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalled();
      expect(gameBrowserClientMock.gamesLists).toHaveBeenCalledWith(
        expect.objectContaining({
          platform: "mobile",
          country: "mt",
          id: "top-list-1",
          hash: "top-list-hash-default-variant",
          variant: "default",
          pageSize: 10
        })
      );
    });

    test("should return all top lists", async () => {
      const response = await service.allTopLists();
      expect(response).toEqual([
        { id: "top-list-1", title: "Top List 1", games: ["game-1"] }
      ]);
    });

    test("should ignore topListId if it does not exists in gamesLists", async () => {
      const response = await service.allTopLists();
      expect(response).not.toBeUndefined();
    });

    test("should not return lists with no games", async () => {
      gameBrowserClientMock.gamesLists.mockImplementation(x =>
        Promise.resolve({ games: [] })
      );

      const response = await service.allTopLists();
      expect(response).toEqual([]);
    });
  });
});
