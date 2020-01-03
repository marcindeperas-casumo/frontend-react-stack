import { createReducer } from "Utils";
import { types } from "./playing.constants";

const DEFAULT_STATE = {
  state: false,
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
