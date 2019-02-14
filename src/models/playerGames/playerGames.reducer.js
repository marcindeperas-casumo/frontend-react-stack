import { types } from "./playerGames.constants";

export const playerGames = (state, action) => {
  if (typeof state === "undefined") {
    return {
      count: 0,
    };
  }

  if (action.type === types.PLAYER_GAMES_FETCH_COUNT_COMPLETE) {
    return {
      ...state,
      count: action.response,
    };
  }

  return state;
};

export default playerGames;
