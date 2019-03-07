import { types } from "./gameSearch.constants";

const defaultState = { query: "" }
export const gameSearchReducer = (state = defaultState, action) => {
  const { type, query } = action;

  if (type.startsWith(types.GAME_SEARCH_FETCH_COMPLETE)) {
    return {
      ...state,
      loading: false,
    };
  }

  switch (type) {
    case types.GAME_SEARCH_FETCH: {
      return {
        ...state,
        loading: true,
        query,
      };
    }

    case types.GAME_SEARCH_CLEAR: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default gameSearchReducer;
