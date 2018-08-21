import cmsClientMock from "../serviceClients/CMSClient";
import { CMSServiceFactory } from "./CMSService";
import commonServiceMock from "./CommonService";
import sessionServiceMock from "./SessionService";
import {
  authenticatedResponse,
  unauthenticatedResponse,
} from "./__mocks__/handshake";

jest.mock("./CommonService");
jest.mock("../serviceClients/CMSClient");
jest.mock("./SessionService");

describe("CMSService", () => {
  let service;

  beforeEach(() => {
    jest.resetAllMocks();
    service = CMSServiceFactory({
      commonService: commonServiceMock,
      cmsClient: cmsClientMock,
      sessionService: sessionServiceMock,
    });
    commonServiceMock.handshake.mockResolvedValue(authenticatedResponse);
  });

  describe("cmsHashForLang", () => {
    test("should return the cmsHashForLang m unauthenticated", async () => {
      commonServiceMock.handshake.mockResolvedValue(unauthenticatedResponse);
      const result = await service.cmsHashForLang("en");
      expect(result).toBe("rootContentHash_en");
    });

    test("should return the cmsHashForLang m authenticated", async () => {
      commonServiceMock.handshake.mockResolvedValue(authenticatedResponse);
      const result = await service.cmsHashForLang("en");
      expect(result).toBe("rootContentHash_en");
    });
  });

  describe("getPage()", () => {
    test("should query the backend only once per given slug", async () => {
      await service.getPage({ slug: "foo" });
      await service.getPage({ slug: "foo" });
      expect(cmsClientMock.queryPage).toHaveBeenCalledTimes(1);
    });
  });
});
