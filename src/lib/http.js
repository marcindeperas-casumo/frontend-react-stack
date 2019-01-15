// @flow
import { stringify } from "qs";

export type FetchType = (
  url: string,
  data: ?Object,
  options: ?Object
) => Promise<any>;

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

const get: FetchType = (url, data, options) =>
  fetch(createGetUrl(url, data), {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const post: FetchType = (url, data, options) =>
  fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

export default {
  get,
  post,
};
