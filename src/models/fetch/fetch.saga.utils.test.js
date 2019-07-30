import { types as fetchTypes } from "./fetch.constants";
import { isFailedFetchTakePatternCreator } from "./fetch.saga.utils";

describe("fetch.saga.utils", () => {
  test("isFailedFetchTakePatternCreator()", () => {
    const type = fetchTypes.REQUEST_ERROR;
    const name = "TEST ACTION";
    const action = {
      name,
      type,
    };

    const predicate = isFailedFetchTakePatternCreator(name);

    expect(predicate(action)).toEqual(true);
  });
});
