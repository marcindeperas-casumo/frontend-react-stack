import { GameBrowserClientFactory } from "./GameBrowserClientFactory";

describe("GameBrowserClientFactory", () => {
  let client;

  const httpService = {
    get: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
    client = GameBrowserClientFactory({ httpService });
  });

  test("should call http service", () => {
    client.handshake();
    expect(httpService.get).toHaveBeenCalledWith("/api/handshake");
  });

  test("should return a resolved promise", async () => {
    httpService.get.mockResolvedValue({ foo: "bar" });
    const response = await client.handshake();

    expect(response).toEqual({
      foo: "bar"
    });
  });

  test("should call http service with id", async () => {
    await client.getById({ id: 1 });
    expect(httpService.get).toBeCalledWith("/api/1");
  });
});
