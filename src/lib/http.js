// @flow
import { stringify } from "qs";

export const DEFAULT_FETCH_OPTIONS = {
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
};

export const createGetUrl = (url: string, data: ?Object) =>
  data ? `${url}?${getQueryParams(data)}` : url;

export const getQueryParams = (params: ?Object) =>
  stringify(params, { skipNulls: true, arrayFormat: "brackets" });

const errorHandler = response => {
  // Heads up! This is erroring out on 30x requests
  // as well - e.g. on 304 not modified.
  if (!response.ok) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(response.statusText);
  }

  return response;
};

const get = (url: string, data: ?Object, options: ?Object) =>
  fetch(createGetUrl(url, data), {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const post = (url: string, data: ?Object, options: ?Object) =>
  fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const http = {
  get,
  post,
};

export default http;
