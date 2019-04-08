import { httpMock } from "Utils";
import { getCommonHandshake, URLS } from "./api.common";

describe("API/Common", () => {
  describe("getCommonHandshake()", () => {
    test("calls http.get() with the right URL", () => {
      getCommonHandshake(httpMock);

      expect(httpMock.get).toHaveBeenCalledTimes(1);
      expect(httpMock.get).toHaveBeenCalledWith(URLS.HANDSHAKE);
    });
  });
});
