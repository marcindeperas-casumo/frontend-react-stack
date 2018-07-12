import { GameBrowserClientFactory } from "./GameBrowserClient";

describe("GameBrowserClientFactory", () => {
  let client;

  const httpService = {
    get: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
    client = GameBrowserClientFactory({ http: httpService });
  });

  test("should call http service", () => {
    client.handshake({ country: "mt", platform: "foo" });
    expect(httpService.get).toHaveBeenCalledWith(
      "gamebrowser/handshake/foo/mt"
    );
  });

  test("should return a resolved promise", async () => {
    httpService.get.mockResolvedValue({ foo: "bar" });
    const response = await client.handshake({ country: "mt" });

    expect(response).toEqual({
      foo: "bar"
    });
  });

  test("should call http service with id", async () => {
    await client.getById({ id: 1 });
    expect(httpService.get).toBeCalledWith("/api/1");
  });
});
