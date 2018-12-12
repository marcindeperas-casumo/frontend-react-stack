// @flow

import { TYPES } from "./errors.constants";

export const logError = (
  message: String,
  error: Object,
  rest: ?Object = {}
) => ({
  type: TYPES.ERROR,
  message,
  error,
  ...rest,
});
