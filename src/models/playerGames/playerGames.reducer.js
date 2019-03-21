/* eslint-disable-next-line filenames/match-exported */
import { createReducer } from "Utils";
import { types } from "./playerGames.constants";

const DEFAULT_STATE = { count: 0 };

const handlers = {
  [types.PLAYER_GAMES_FETCH_COUNT_COMPLETE]: (state, action) => ({
    ...state,
    count: action.response,
  }),
};

export const playerGamesReducer = createReducer(DEFAULT_STATE, handlers);

export default playerGamesReducer;
