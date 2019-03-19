import { put, call } from "redux-saga/effects";
import http from "Lib/http";
import * as actions from "./fetch.actions";
import { fetchSaga } from "./fetch.saga";

describe("fetch saga", () => {
  test("success flow", () => {
    const name = "actionName";
    const method = "GET";
    const url = "/some/url";
    const data = { foo: "bar" };

    const generator = fetchSaga({
      name,
      method,
      url,
      data,
    });

    expect(generator.next().value).toEqual(put(actions.clearError(name)));
    expect(generator.next().value).toEqual(put(actions.sendRequest(name)));
    expect(generator.next().value).toEqual(call(http.get, url, data));
    expect(generator.next().value).toEqual(put(actions.requestComplete(name)));
  });

  test("success flow with callback action", () => {
    const name = "actionName";
    const method = "POST";
    const url = "/some/url";
    const data = { foo: "bar" };
    const postFetch = "postFetchActionName";
    const returnData = { foo: { bar: "baz" } };

    const generator = fetchSaga({
      name,
      method,
      url,
      data,
      postFetch,
    });

    expect(generator.next().value).toEqual(put(actions.clearError(name)));
    expect(generator.next().value).toEqual(put(actions.sendRequest(name)));
    expect(generator.next().value).toEqual(call(http.post, url, data));
    expect(generator.next(returnData).value).toEqual(
      put(actions.postFetch(postFetch, returnData))
    );
    expect(generator.next().value).toEqual(put(actions.requestComplete(name)));
  });

  test("success flow with asyncCall", () => {
    const name = "actionName";
    const asyncCall = jest.fn();
    const postFetch = "postFetchActionName";
    const returnData = { foo: { bar: "baz" } };
    const asyncCallData = { foo: "bar" };

    const generator = fetchSaga({
      name,
      asyncCall,
      asyncCallData,
      postFetch,
    });

    expect(generator.next().value).toEqual(put(actions.clearError(name)));
    expect(generator.next().value).toEqual(put(actions.sendRequest(name)));
    expect(generator.next().value).toEqual(call(asyncCall, asyncCallData));
    expect(generator.next(returnData).value).toEqual(
      put(actions.postFetch(postFetch, returnData))
    );
    expect(generator.next().value).toEqual(put(actions.requestComplete(name)));
  });

  test("erroneous flow", () => {
    const name = "actionName";
    const method = "GET";
    const url = "/some/url";
    const data = { foo: "bar" };
    const errorMessage = "error";

    const generator = fetchSaga({
      name,
      method,
      url,
      data,
    });

    expect(generator.next().value).toEqual(put(actions.clearError(name)));
    expect(generator.next().value).toEqual(put(actions.sendRequest(name)));
    expect(generator.throw({ message: errorMessage }).value).toEqual(
      put(actions.requestError(name, errorMessage))
    );
    expect(generator.next().value).toEqual(put(actions.requestComplete(name)));
  });
});
