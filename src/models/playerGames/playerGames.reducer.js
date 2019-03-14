/* eslint-disable-next-line filenames/match-exported */
import { types } from "./playerGames.constants";

const DEFAULT_STATE = { count: 0 };

const reducers = {
  [types.PLAYER_GAMES_FETCH_COUNT_COMPLETE]: (state, action) => ({
    ...state,
    count: action.response,
  }),
};

export const playerGamesReducer = (state = DEFAULT_STATE, action) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
};

export default playerGamesReducer;
