import { JackpotsClientFactory, JackpotsAPIUrl } from "./JackpotsClient";

describe("CommonClient", () => {
  let client;
  const httpService = {
    get: jest.fn(),
  };

  beforeEach(() => {
    client = JackpotsClientFactory({ http: httpService });
  });

  test("should call https service with jackpots url once", () => {
    client.jackpots();
    expect(httpService.get).toHaveBeenCalledWith(JackpotsAPIUrl);
  });
});
