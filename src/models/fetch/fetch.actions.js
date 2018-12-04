import { types } from "./fetch.constants";

export const sendRequest = name => ({
  type: types.SENDING_REQUEST,
  name,
});

export const requestComplete = name => ({
  type: types.REQUEST_COMPLETE,
  name,
});

export const requestError = (name, message) => ({
  type: types.REQUEST_ERROR,
  name,
  error: message,
});

export const clearError = name => ({
  type: types.CLEAR_ERROR,
  name,
});

export const generalFetch = (name, { method, url, data }, postFetch) => ({
  type: types.FETCH,
  name,
  method,
  url,
  data,
  postFetch,
});

export const postFetch = (type, response) => ({ type, response });
