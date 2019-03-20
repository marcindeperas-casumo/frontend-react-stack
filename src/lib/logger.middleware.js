/**
 * This middleware is used to log the state object with error as well
 * to provide more context.
 *
 * To log an error using this middleware simply send an action in the following format:
 * {
 *     type: "ERROR",
 *     error: new Error(),
 *     message: "Short, informative error message"
 * }
 */

import { sanitizeObject } from "Utils";

const isError = action => action.type === "ERROR";
const noop = () => {};

// TODO: Add possibility to wrap actions in a try {} catch () {} as well
export default function loggerMiddleware(logError = noop, sanitizedKeys = []) {
  return store => next => action => {
    if (isError(action)) {
      const { message = "", error, ...additionalParams } = action;
      const sanitizedState = sanitizeObject(store.getState(), sanitizedKeys);
      const stringifiedState = JSON.stringify(sanitizedState);
      const stringifiedAction = JSON.stringify(action);

      logError(message, error, {
        state: stringifiedState,
        action: stringifiedAction,
        ...additionalParams,
      });
    }

    return next(action);
  };
}
