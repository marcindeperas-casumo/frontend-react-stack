import { JackpotsClientFactory, JackpotsAPIUrl } from "Clients/JackpotsClient";

describe("JackpotsClient", () => {
  let client;
  const httpService = {
    get: jest.fn(),
  };

  beforeEach(() => {
    client = JackpotsClientFactory({ http: httpService });
  });

  test("should call https service with jackpots url once", () => {
    const market = "foo";
    const currencyCode = "bar";

    client.jackpots({ market, currencyCode });
    expect(httpService.get).toHaveBeenCalledWith(
      `${JackpotsAPIUrl}/${market}/currency/${currencyCode}`
    );
  });
});
