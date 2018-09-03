import { JackpotsClientFactory, JackpotsAPIUrl } from "./JackpotsClient";

describe("JackpotsClient", () => {
  let client;
  const httpService = {
    get: jest.fn(),
  };

  beforeEach(() => {
    client = JackpotsClientFactory({ http: httpService });
  });

  test("should call https service with jackpots url once", () => {
    const market = "foobar";

    client.jackpots(market);
    expect(httpService.get).toHaveBeenCalledWith(`${JackpotsAPIUrl}/${market}`);
  });
});
