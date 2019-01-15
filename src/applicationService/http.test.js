import httpLib from "Lib/http";
import logger from "./logger";
import http from "./http";

jest.mock("../lib/http");
jest.mock("./logger");

describe("Services/http", () => {
  const errorMessage = "Something wrong happened.";
  const error = new Error(errorMessage);
  const url = "/foo/bar";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("logs an error if a GET request fails", async () => {
    httpLib.get.mockRejectedValue(error);

    try {
      await http.get(url);
    } catch (err) {
      expect(logger.error).toBeCalledTimes(1);
      expect(logger.error.mock.calls[0][0]).toEqual(errorMessage);
      expect(logger.error.mock.calls[0][1]).toEqual(error);
      expect(logger.error.mock.calls[0][2]).toMatchObject({ url });
    }
  });

  test("logs an error if a POST request fails", async () => {
    httpLib.post.mockRejectedValue(error);

    try {
      await http.post(url);
    } catch (err) {
      expect(logger.error).toBeCalledTimes(1);
      expect(logger.error.mock.calls[0][0]).toEqual(errorMessage);
      expect(logger.error.mock.calls[0][1]).toEqual(error);
      expect(logger.error.mock.calls[0][2]).toMatchObject({ url });
    }
  });

  test("re-throws the error so it is not swallowed", async () => {
    httpLib.get.mockRejectedValue(error);

    try {
      await http.get(url);
    } catch (err) {
      return;
    }

    // eslint-disable-next-line fp/no-throw
    throw new Error("HTTP: errorHandler should re-throw the errors");
  });

  test("does NOT log an error a request doesn't fail", async () => {
    httpLib.get.mockResolvedValue({});
    httpLib.post.mockResolvedValue({});
    await http.get(url);
    await http.post(url);

    expect(logger.error).not.toBeCalled();
  });
});
