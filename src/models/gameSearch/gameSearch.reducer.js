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
        hasNoResults: false,
        query,
      };
    }

    case types.GAME_SEARCH_CLEAR: {
      return {
        ...state,
        loading: false,
        hasNoResults: false,
      };
    }

    case types.GAME_SEARCH_NO_RESULTS: {
      return {
        ...state,
        hasNoResults: true,
      };
    }

    case types.GAME_SEARCH_NO_LATEST_PLAYED: {
      return {
        ...state,
        hasNoLatestPlayed: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default gameSearchReducer;
