import { actions, types, fetchStatus } from ".";

describe("Actions: fetch", () => {
  test("SENDING_REQUEST", () => {
    const name = "foo";
    const action = {
      type: types.SENDING_REQUEST,
      name,
    };
    expect(actions.sendRequest(name)).toEqual(action);
  });

  test("REQUEST_COMPLETE", () => {
    const name = "foo";
    const action = {
      type: types.REQUEST_COMPLETE,
      name,
    };
    expect(actions.requestComplete(name)).toEqual(action);
  });

  test("REQUEST_ERROR", () => {
    const name = "foo";
    const message = "message";
    const action = {
      type: types.REQUEST_ERROR,
      name,
      error: message,
    };
    expect(actions.requestError(name, message)).toEqual(action);
  });

  test("CLEAR_ERROR", () => {
    const name = "foo";
    const action = {
      type: types.CLEAR_ERROR,
      name,
    };
    expect(actions.clearError(name)).toEqual(action);
  });
});

describe("Reducer: fetchStatus", () => {
  test("SENDING_REQUEST", () => {
    const name = "foo";
    const action = actions.sendRequest(name);
    const state = {};

    expect(fetchStatus(state, action)).toEqual({
      [name]: { isFetching: true },
    });
  });

  test("REQUEST_COMPLETE", () => {
    const name = "foo";
    const action = actions.requestComplete(name);
    const state = {};

    expect(fetchStatus(state, action)).toEqual({
      [name]: { isFetching: false },
    });
  });

  test("REQUEST_ERROR", () => {
    const name = "foo";
    const errorMessage = "foo error message";
    const action = actions.requestError(name, errorMessage);
    const state = {};

    expect(fetchStatus(state, action)).toEqual({
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

    expect(fetchStatus(state, action)).toEqual({
      [name]: { error: null },
    });
  });
});
