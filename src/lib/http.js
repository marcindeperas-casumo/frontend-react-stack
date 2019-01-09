// @flow
const errorHandler = response => {
  if (!response.ok) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(response.statusText);
  }

  return response;
};

const defaultFetch = (url: string, options: ?Object) => {
  return fetch(url, {
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
  })
    .then(errorHandler)
    .then(response => response.json());
};

const get = defaultFetch;

const post = (url: string, options: ?Object) =>
  defaultFetch(url, {
    method: "POST",
    ...options,
  });

const http = {
  get,
  post,
  fetch: defaultFetch,
};

export default http;
