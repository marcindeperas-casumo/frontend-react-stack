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

  afterEach(() => {
    console.log(gameBrowserClientMock.handshake.mock.calls);
  });

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

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith({
      country: "mt"
    });
  });

  test("should pull the country from the session service", async () => {
    await service.getIds();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith({
      country: "mt"
    });

    service.config.set({ country: "gb" });

    await service.getIds();

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledWith({
      country: "gb"
    });
  });
});
