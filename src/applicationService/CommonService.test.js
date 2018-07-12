import commonClientMock from "../serviceClients/CommonClient";
import { CommonServiceFactory } from "./CommonService";

jest.mock("../serviceClients/CommonClient");

describe("Game Browser Service", () => {
  let service;

  beforeEach(() => {
    service = CommonServiceFactory({ commonClient: commonClientMock });

    jest.resetAllMocks();
    commonClientMock.handshake.mockResolvedValue({});
  });

  // afterEach(() => {
  //   console.log(commonClientMock.handshake.mock.calls);
  // });

  test("should call handshake on client", async () => {
    await service.handshake();

    expect(commonClientMock.handshake).toHaveBeenCalled();
  });

  test("should call handshake once", async () => {
    await service.handshake();
    await service.handshake();

    expect(commonClientMock.handshake).toHaveBeenCalledTimes(1);
  });

  test('should call handshake again if it is invalidated', async () => {
    await service.handshake();
    service.invalidateHandshake();
    await service.handshake();

    expect(commonClientMock.handshake).toHaveBeenCalledTimes(2);
  });
});
