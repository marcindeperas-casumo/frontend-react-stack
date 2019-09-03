import { createReducer } from "Utils";
import { types, PLAYING_STATE } from "./playing.constants";

const DEFAULT_STATE = {
  state: PLAYING_STATE.STOPPED,
  gameId: null,
};

const handlers = {
  [types.PLAYING]: (prevState, { state, gameId = null }) => ({
    ...prevState,
    state,
    gameId,
  }),
};

const playingReducer = createReducer(DEFAULT_STATE, handlers);

export default playingReducer;
