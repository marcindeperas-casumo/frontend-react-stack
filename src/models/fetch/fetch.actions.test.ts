import { types } from "./fetch.constants";
import * as actions from "./fetch.actions";

describe("Models/Fetch/Actions", () => {
  test("sendRequest()", () => {
    const name = "foo";
    const action = {
      type: types.SENDING_REQUEST,
      name,
    };
    expect(actions.sendRequest(name)).toEqual(action);
  });

  test("requestComplete()", () => {
    const name = "foo";
    const action = {
      type: types.REQUEST_COMPLETE,
      name,
    };
    expect(actions.requestComplete(name)).toEqual(action);
  });

  test("requestError()", () => {
    const name = "foo";
    const message = "message";
    const action = {
      type: types.REQUEST_ERROR,
      name,
      error: message,
    };
    expect(actions.requestError(name, message)).toEqual(action);
  });

  test("clearError()", () => {
    const name = "foo";
    const action = {
      type: types.CLEAR_ERROR,
      name,
    };
    expect(actions.clearError(name)).toEqual(action);
  });
});
