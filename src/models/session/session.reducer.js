import { CHANNELS, takeChannel } from "Models/cometd";

const DEFAULT_STATE = {
  valid: true,
};

const sessionReducer = (state = DEFAULT_STATE, action) => {
  if (takeChannel(CHANNELS.SESSION)(action)) {
    return {
      ...state,
      valid: false,
    };
  }

  return state;
};

export default sessionReducer;
