// @flow
// This service is wrapping the "Lib/http" module
// and extends it with some project specific error logging.

import http from "Lib/http";
import type { FetchType } from "Lib/http";
import logger from "Services/logger";

const errorHandler = url => error => {
  logger.error(error.message, error, { url });
};

const fetch: FetchType = (url, options) =>
  http.fetch(url, options).catch(errorHandler(url));

const post: FetchType = (url, options) =>
  http.post(url, options).catch(errorHandler(url));

const get: FetchType = (url, options) =>
  http.get(url, options).catch(errorHandler(url));

export default {
  fetch,
  post,
  get,
};
