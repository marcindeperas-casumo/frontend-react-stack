/* eslint-disable-next-line filenames/match-exported */
import { types } from "./playerGames.constants";

const defaultState = { count: 0 };

export const playerGamesReducer = (state = defaultState, action) => {
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

export default playerGamesReducer;
