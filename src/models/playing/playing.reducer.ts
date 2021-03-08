import { createReducer } from "Utils";
import { types } from "./playing.constants";

const DEFAULT_STATE = {
  isPlaying: false,
  gameId: null,
};

const handlers = {
  [types.PLAYING]: (prevState, { isPlaying, gameId = null }) => ({
    ...prevState,
    isPlaying,
    gameId,
  }),
};

const playingReducer = createReducer(DEFAULT_STATE, handlers);

export default playingReducer;
