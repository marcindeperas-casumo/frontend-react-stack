import http, { DEFAULT_FETCH_OPTIONS } from "./http";

describe("Lib/http", () => {
  const responseObject = { foo: "bar" };
  const getFetchCallUrlArg = () => fetch.mock.calls[0][0];
  const getFetchCallOptionsArg = () => fetch.mock.calls[0][1];
  let responseMock;

  beforeEach(() => {
    responseMock = {
      ok: true,
      json: jest.fn().mockReturnValue(responseObject),
    };
    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn().mockResolvedValue(responseMock);
  });

  describe(".get()", () => {
    test("parses the JSON response", async () => {
      const response = await http.get("/foo/bar");

      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(response).toEqual(responseObject);
    });

    test("rejects the promise if the request fails", async () => {
      const errorMessage = "Some error.";

      responseMock = {
        ...responseMock,
        ok: false,
        statusText: errorMessage,
      };

      // eslint-disable-next-line no-native-reassign
      fetch = jest.fn().mockResolvedValue(responseMock);

      expect(http.get("/foo/bar")).rejects.toMatchObject({
        message: errorMessage,
      });
    });

    test("fetches the right URL", async () => {
      await http.get("/foo/bar");

      expect(getFetchCallUrlArg()).toMatch("/foo/bar");
    });

    test("uses the default options", async () => {
      await http.get("/foo/bar");

      expect(getFetchCallOptionsArg()).toMatchObject(DEFAULT_FETCH_OPTIONS);
    });

    test("extends the fetch options if specified", async () => {
      const optionsOverride = { foo: "bar", bar: "foo" };
      const data = null;

      await http.get("/foo/bar", data, optionsOverride);

      expect(getFetchCallOptionsArg()).toMatchObject(optionsOverride);
    });
  });
});
