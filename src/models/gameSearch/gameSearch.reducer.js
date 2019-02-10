import { types } from "./gameSearch.constants";

export const gameSearchReducer = (state, action) => {
  if (typeof state === "undefined") {
    return {
      loading: true,
      hasNoResults: false,
      hasNoLatestPlayed: false,
    };
  }

  switch (action.type) {
    case types.GAME_SEARCH_FETCH_PLAYER_GAMES:
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

    case types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE:
    case types.GAME_SEARCH_FETCH_COMPLETE: {
      return {
        ...state,
        loading: false,
        startIndex: action.startIndex,
      };
    }

    case types.GAME_SEARCH_CLEAR: {
      return {
        ...state,
        loading: false,
        hasNoResults: false,
      };
    }

    case types.GAME_SEARCH_UPDATE_START_INDEX: {
      return {
        ...state,
        startIndex: action.startIndex,
      };
    }

    default:
      return state;
  }
};

export default gameSearchReducer;
