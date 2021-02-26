import http, { DEFAULT_FETCH_OPTIONS } from "./http";

describe("Lib/http", () => {
  const responseObject = { foo: "bar" };
  const getFetchCallUrlArg = () => fetch.mock.calls[0][0];
  const getFetchCallOptionsArg = () => fetch.mock.calls[0][1];
  let responseMock;
  let responseHeadersMock;

  const mockFetch = (responseMockOverride, responseHeadersMockOverride) => {
    responseHeadersMock = {
      "Content-Length": JSON.stringify(responseObject).length.toString(),
      ...responseHeadersMockOverride,
    };
    responseMock = {
      ok: true,
      json: jest.fn().mockReturnValue(responseObject),
      headers: {
        get: jest
          .fn()
          .mockImplementation(headerName => responseHeadersMock[headerName]),
      },
      ...responseMockOverride,
    };

    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn().mockResolvedValue(responseMock);
  };

  beforeEach(() => {
    mockFetch();
  });

  describe(".post()", () => {
    test("parses the JSON response", async () => {
      const response = await http.post("/foo/bar");

      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(response).toEqual(responseObject);
    });

    test("rejects the promise if the request fails", async () => {
      mockFetch({ ok: false, statusText: "Some error." });

      await expect(http.post("/foo/bar")).rejects.toMatchObject({
        message: "Some error.",
      });
    });

    test("posts to the right URL", async () => {
      await http.post("/foo/bar");

      expect(getFetchCallUrlArg()).toMatch("/foo/bar");
    });

    test("uses the default options", async () => {
      await http.post("/foo/bar");

      expect(getFetchCallOptionsArg()).toMatchObject(DEFAULT_FETCH_OPTIONS);
    });

    test("extends the fetch options if specified", async () => {
      const optionsOverride = { foo: "bar", bar: "foo" };
      const data = null;

      await http.post("/foo/bar", data, optionsOverride);

      expect(getFetchCallOptionsArg()).toMatchObject(optionsOverride);
    });

    test("uses the POST method", async () => {
      await http.post("/foo/bar");

      expect(getFetchCallOptionsArg()).toMatchObject({ method: "POST" });
    });

    test("sends data in the body as a JSON", async () => {
      const data = { foo: "bar" };

      await http.post("/foo/bar", data);

      expect(getFetchCallOptionsArg()).toMatchObject({ body: '{"foo":"bar"}' });
    });

    test("does not set the body if there is no data", async () => {
      await http.post("/foo/bar");

      expect(getFetchCallOptionsArg().body).toBeUndefined();
    });

    test("does not fail when response is empty", async () => {
      mockFetch(
        {
          status: 202,
        },
        {
          "Content-Length": "0",
        }
      );

      const response = await http.post("/foo/bar");

      expect(responseMock.json).toHaveBeenCalledTimes(0);
      expect(response).toEqual({});
    });
  });

  describe(".get()", () => {
    test("parses the JSON response", async () => {
      const response = await http.get("/foo/bar");

      expect(responseMock.json).toHaveBeenCalledTimes(1);
      expect(response).toEqual(responseObject);
    });

    test("rejects the promise if the request fails", async () => {
      mockFetch({ ok: false, statusText: "Some error." });

      await expect(http.get("/foo/bar")).rejects.toMatchObject({
        message: "Some error.",
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

    test("sends the data in the URL as a query string if set", async () => {
      const data = { foo: "bar", bar: "foo" };

      await http.get("/foo/bar", data);

      expect(getFetchCallUrlArg()).toBe("/foo/bar?foo=bar&bar=foo");
    });

    test("ignores null properties in the data", async () => {
      const data = { foo: "bar", bar: "foo", ignored: null };

      await http.get("/foo/bar", data);

      expect(getFetchCallUrlArg()).toBe("/foo/bar?foo=bar&bar=foo");
    });

    test("does not send query params if the data is empty", async () => {
      await http.get("/foo/bar");
      expect(getFetchCallUrlArg()).toBe("/foo/bar");
    });

    test("transforms array properties in the data using brackets", async () => {
      const data = { id: ["123", "345"], bar: "foo" };

      await http.get("/foo/bar", data);

      expect(getFetchCallUrlArg()).toBe(
        "/foo/bar?id%5B%5D=123&id%5B%5D=345&bar=foo"
      );
    });
  });
});
