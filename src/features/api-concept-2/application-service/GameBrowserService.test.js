import service from "./GameBrowserServiceFactory";

import gameBrowserClientMock from "../service-clients/GameBrowserClientFactory";
jest.mock("../service-clients/GameBrowserClientFactory");

describe("Game Browser Service", () => {
  beforeEach(() => {
    gameBrowserClientMock.getById.mockImplementation(({ id, hash }) =>
      Promise.resolve({ id, hash, list: [id] })
    );

    gameBrowserClientMock.handshake.mockResolvedValue({
      list: [1, 2],
      hash: {
        i1: "hash-1",
        i2: "hash-2"
      }
    });
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
      { id: 1, hash: "hash-1", list: [1] },
      { id: 2, hash: "hash-2", list: [2] }
    ]);

    expect(gameBrowserClientMock.handshake).toHaveBeenCalledTimes(1);
  });

  test("should return all products", async () => {
    const response = await service.getAll();
    expect(response).toEqual([
      { id: 1, hash: "hash-1", list: [1] },
      { id: 2, hash: "hash-2", list: [2] }
    ]);

    gameBrowserClientMock.handshake.mockResolvedValue({
      list: [3],
      hash: {
        i3: "hash-3"
      }
    });

    await service.invalidateHandshake();
    const responseAfterUpdate = await service.getAll();
    expect(responseAfterUpdate).toEqual([{ id: 3, hash: "hash-3", list: [3] }]);
  });
});
