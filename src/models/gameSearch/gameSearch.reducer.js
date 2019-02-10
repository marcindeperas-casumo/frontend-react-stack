import { types } from "./gameSearch.constants";

export const gameSearchReducer = (state, action) => {
  if (typeof state === "undefined") {
    return {
      loading: false,
      hasNoResults: false,
      hasNoLatestPlayed: false,
    };
  }
  const { type } = action;

  switch (type) {
    case types.GAME_SEARCH_FETCH: {
      return {
        ...state,
        loading: true,
        hasNoResults: false,
        query: action.q,
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

    case types.GAME_SEARCH_FETCH_COMPLETE: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GAME_SEARCH_CLEAR: {
      return {
        ...state,
        loading: false,
        hasNoResults: false,
      };
    }

    default:
      if (type.startsWith(types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE)) {
        return {
          ...state,
          loading: false,
        };
      }
      return state;
  }
};

export default gameSearchReducer;
