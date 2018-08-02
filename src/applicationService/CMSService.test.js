import { CMSServiceFactory } from "./CMSService";
import commonServiceMock from "./CommonService";
import {
  authenticatedResponse,
  unauthenticatedResponse,
} from "./__mocks__/handshake";

jest.mock("./CommonService");

describe("CMSService", () => {
  let service;

  beforeEach(() => {
    jest.resetAllMocks();
    service = CMSServiceFactory({
      commonService: commonServiceMock,
    });
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
});
