import { stringify } from "qs";

export type FetchType = (
  url: string,
  data?: Object,
  options?: Object,
) => Promise<any>;

export const DEFAULT_FETCH_OPTIONS = {
  credentials: "same-origin",
  headers: {
    "content-type": "application/json",
  },
};

export const createGetUrl = (url: string, data: Object | undefined) =>
  data ? `${url}?${buildQueryParams(data)}` : url;

export const buildQueryParams = (params: Object | undefined, options = {}) =>
  stringify(params, { skipNulls: true, arrayFormat: "brackets", ...options });

const errorHandler = response => {
  // Heads up! This is erroring out on 30x requests
  // as well - e.g. on 304 not modified.
  if (!response.ok) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(response.statusText);
  }

  return response;
};

const emptyResponseHandler = response =>
  response
    .text()
    .then(responseText =>
      responseText.length > 0 ? JSON.parse(responseText) : {}
    );

const get: FetchType = (url, data, options) =>
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ constructor: Function; toStrin... Remove this comment to see the full error message
  fetch(createGetUrl(url, data), {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(response => response.json());

const post: FetchType = (url, data, options) =>
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ constructor: Function; toStrin... Remove this comment to see the full error message
  fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  })
    .then(errorHandler)
    .then(emptyResponseHandler);

const del: FetchType = (url, options) =>
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ constructor: Function; toStrin... Remove this comment to see the full error message
  fetch(url, {
    method: "DELETE",
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  });


export default {
  del,
  get,
  post,
};
