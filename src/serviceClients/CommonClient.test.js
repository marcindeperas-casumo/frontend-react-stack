import { CommonClientFactory } from "./CommonClient";

describe("CommonClient", () => {
  let client;
  const httpService = {
    get: jest.fn()
  };

  beforeEach(() => {
    client = CommonClientFactory({ http: httpService });
  });

  test("should call https service with handshake url once", () => {
    client.handshake();
    expect(httpService.get).toHaveBeenCalledWith("common/handshake");
  });
});
