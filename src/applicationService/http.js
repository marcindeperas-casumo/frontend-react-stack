// @flow
// This service is wrapping the "Lib/http" module
// and extends it with some project specific error logging.

import http from "Lib/http";
import type { FetchType } from "Lib/http";
import logger from "Services/logger";

const errorHandler = url => error => {
  logger.error(error.message, error, { url });

  // eslint-disable-next-line fp/no-throw
  throw error;
};

const post: FetchType = (url, data, options) =>
  http.post(url, data, options).catch(errorHandler(url));

const get: FetchType = (url, data, options) =>
  http.get(url, data, options).catch(errorHandler(url));

export default {
  post,
  get,
};
