/* eslint-disable-next-line filenames/match-exported */
import { types } from "./playerGames.constants";

const defaultState = { count: 0 };

const reducers = {
  [types.PLAYER_GAMES_FETCH_COUNT_COMPLETE]: (state, action) => ({
    ...state,
    count: action.response,
  }),
};

export const playerGamesReducer = (state = defaultState, action) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
};

export default playerGamesReducer;
