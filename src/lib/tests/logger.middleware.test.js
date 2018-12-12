import createLoggerMiddleware from "../logger.middleware";

describe("Lib/LoggerMiddleware", () => {
  const state = { a: "b", b: "c" };
  const getState = () => state;
  const store = { getState };
  let sanitizedKeys;
  let middleware;
  let next;
  let logError;

  beforeEach(() => {
    sanitizedKeys = [];
    logError = jest.fn();
    next = jest.fn();
    middleware = createLoggerMiddleware(logError, sanitizedKeys)(store)(next);
  });

  test("calls the logError() if the action is an error", () => {
    const action = {
      type: "ERROR",
      error: "123",
    };

    middleware(action);

    expect(logError).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });

  test("does not call the logError() if the action is not an error", () => {
    const action = {
      type: "Unknown",
    };

    middleware(action);

    expect(logError).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(action);
  });

  test("calls the logError() with the correct parameters", () => {
    const message = "Foo bar.";
    const error = new Error(message);
    const extra = "Extra description...";
    const action = {
      type: "ERROR",
      message,
      error,
      extra,
    };

    middleware(action);

    const firstArg = logError.mock.calls[0][0];
    const secondArg = logError.mock.calls[0][1];
    const thirdArg = logError.mock.calls[0][2];

    expect(firstArg).toBe(message);
    expect(secondArg).toEqual(error);
    expect(thirdArg.extra).toEqual(extra);
    expect(thirdArg.action).toEqual(JSON.stringify(action));
    expect(thirdArg.state).toEqual(JSON.stringify(state));
  });

  test("should be possible to sanitize the state", () => {
    const message = "Foo bar.";
    const error = new Error(message);
    const action = {
      type: "ERROR",
      message,
      error,
    };

    middleware = createLoggerMiddleware(logError, ["b"])(store)(next);
    middleware(action);

    const thirdArg = logError.mock.calls[0][2];

    expect(thirdArg.state).toEqual(JSON.stringify({ a: "b", b: "******" }));
  });
});
