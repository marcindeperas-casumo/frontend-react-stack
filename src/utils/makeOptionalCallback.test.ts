import { makeOptionalCallback } from "./makeOptionalCallback";

describe("makeOptionalCallback", () => {
  test("returns undefined if no callback supplied", () => {
    const noCallback = makeOptionalCallback();
    const noCallbackWithParams = makeOptionalCallback(undefined, "param1");

    expect(noCallback).toBeUndefined();
    expect(noCallbackWithParams).toBeUndefined();
  });

  test("returns a callable function if supplied", () => {
    const fn = jest.fn();
    const callback = makeOptionalCallback(fn);

    callback();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("ensures correct parameters are applied on callback", () => {
    const fn = jest.fn();
    const callback = makeOptionalCallback(fn, "param1", true, 21);

    callback();

    expect(fn).toHaveBeenCalledWith("param1", true, 21);
  });
});
