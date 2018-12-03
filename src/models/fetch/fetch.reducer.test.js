import * as actions from "./fetch.actions";
import reducer from "./fetch.reducer";

describe("Models/Fetch/Reducer", () => {
  test("SENDING_REQUEST", () => {
    const name = "foo";
    const action = actions.sendRequest(name);
    const state = {};

    expect(reducer(state, action)).toEqual({
      [name]: { isFetching: true },
    });
  });

  test("REQUEST_COMPLETE", () => {
    const name = "foo";
    const action = actions.requestComplete(name);
    const state = {};

    expect(reducer(state, action)).toEqual({
      [name]: { isFetching: false },
    });
  });

  test("REQUEST_ERROR", () => {
    const name = "foo";
    const errorMessage = "foo error message";
    const action = actions.requestError(name, errorMessage);
    const state = {};

    expect(reducer(state, action)).toEqual({
      [name]: { error: errorMessage, response: null },
    });
  });

  test("CLEAR_ERROR", () => {
    const name = "foo";
    const action = actions.clearError(name);
    const state = {
      [name]: {
        error: "foo",
      },
    };

    expect(reducer(state, action)).toEqual({
      [name]: { error: null },
    });
  });
});
