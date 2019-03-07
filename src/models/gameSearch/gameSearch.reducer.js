import { types } from "./gameSearch.constants";

export const gameSearchReducer = (state = {}, action) => {
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
