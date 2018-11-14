import { fetchSelector, fetchStatusFactory } from "Models/fetch/selectors";

describe("Fetch selectors", () => {
  test("fetchSelector", () => {
    const state = {
      fetch: { foo: "bar" },
    };

    expect(fetchSelector(state)).toEqual({ foo: "bar" });
  });

  describe("fetchStatusFactory", () => {
    test("return status that exists", () => {
      const state = {
        fetch: {
          name1: {
            foo: "name1",
          },
        },
      };

      expect(fetchStatusFactory("name1")(state)).toEqual({
        foo: "name1",
      });
    });

    test("return status for a name that does not exist", () => {
      const state = {
        fetch: {},
      };

      expect(fetchStatusFactory("name1")(state)).toEqual({
        isFetching: false,
        error: null,
      });
    });
  });
});
