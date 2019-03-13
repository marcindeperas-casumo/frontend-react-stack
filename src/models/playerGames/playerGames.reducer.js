import { types } from "./playerGames.constants";

const defaultState = { count: 0 };

export const playerGames = (state = defaultState, action) => {
  switch (action.type) {
    case types.PLAYER_GAMES_FETCH_COUNT_COMPLETE: {
      return {
        ...state,
        count: action.response,
      };
    }

    default: {
      return state;
    }
  }
};

export default playerGames;
