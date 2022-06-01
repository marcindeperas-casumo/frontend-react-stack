// @ts-nocheck apply fix if you know the context

import {
  isFetched,
  getFetch,
  isFetchingStarted,
  isNotFetchedSelector,
} from "./fetch.selectors";

describe("Fetch selectors", () => {
  describe("getFetch()", () => {
    test("returns the fetch object by type", () => {
      const name = "FOO/BAR";
      const fetchObject = {
        error: null,
        isFetching: false,
      };
      const state = {
        fetch: {
          [name]: fetchObject,
        },
      };

      expect(getFetch(name)(state)).toEqual(fetchObject);
    });
  });

  describe("isFetched()", () => {
    test("returns TRUE if the requested type is fetched", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: false,
          },
        },
      };

      expect(isFetched(name)(state)).toBe(true);
    });

    test("returns FALSE if it is not started to be fetched yet", () => {
      const name = "FOO/BAR";
      const state = {};

      expect(isFetched(name)(state)).toBe(false);
    });

    test("returns FALSE if it is being fetched", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: true,
          },
        },
      };

      expect(isFetched(name)(state)).toBe(false);
    });

    test("returns FALSE if the request errors out", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: { foo: "bar" },
            isFetching: false,
          },
        },
      };

      expect(isFetched(name)(state)).toBe(false);
    });
  });

  describe("isFetchingStarted()", () => {
    test("returns TRUE if the fetching is started but not fetched yet", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: true,
          },
        },
      };

      expect(isFetchingStarted(name)(state)).toBe(true);
    });

    test("returns TRUE if it is fetched", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: false,
          },
        },
      };

      expect(isFetchingStarted(name)(state)).toBe(true);
    });

    test("returns FALSE if it has errored out (so we can try again)", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: { foo: "bar" },
            isFetching: false,
          },
        },
      };

      expect(isFetchingStarted(name)(state)).toBe(false);
    });

    test("returns FALSE if it has not been fetched yet", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {},
      };

      expect(isFetchingStarted(name)(state)).toBe(false);
    });
  });

  describe("isNotFetchedSelector()", () => {
    test("returns TRUE if it was not started to be fetched yet", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {},
      };

      expect(isNotFetchedSelector(name)(state)).toBe(true);
    });

    test("returns FALSE if it was started to be fetched", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: true,
          },
        },
      };

      expect(isNotFetchedSelector(name)(state)).toBe(false);
    });

    test("returns FALSE if it is already fetched", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: null,
            isFetching: false,
          },
        },
      };

      expect(isNotFetchedSelector(name)(state)).toBe(false);
    });

    test("returns FALSE if it was fetched but errored out", () => {
      const name = "FOO/BAR";
      const state = {
        fetch: {
          [name]: {
            error: { foo: "bar" },
            isFetching: true,
          },
        },
      };

      expect(isNotFetchedSelector(name)(state)).toBe(false);
    });
  });
});
