export const types = {
  SENDING_REQUEST: "FETCH/SENDING_REQUEST",
  REQUEST_ERROR: "FETCH/REQUEST_ERROR",
  REQUEST_COMPLETE: "FETCH/REQUEST_COMPLETE",
  CLEAR_ERROR: "FETCH/CLEAR_ERROR",
  FETCH: "FETCH/API_CALL",
};

export const fetchStatus = (state = {}, action) => {
  switch (action.type) {
    case types.SENDING_REQUEST: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isFetching: true,
        },
      };
    }
    case types.REQUEST_COMPLETE: {
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isFetching: false,
        },
      };
    }
    case types.REQUEST_ERROR:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: action.error,
          response: null,
        },
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: null,
        },
      };
    default:
      return state;
  }
};

export default fetchStatus;

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

export const actions = {
  sendRequest,
  requestComplete,
  requestError,
  clearError,
  postFetch,
};
