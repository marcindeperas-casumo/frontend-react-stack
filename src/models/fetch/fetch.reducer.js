import { types } from "./fetch.constants";

export const fetchReducer = (state = {}, action) => {
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

export default fetchReducer;
