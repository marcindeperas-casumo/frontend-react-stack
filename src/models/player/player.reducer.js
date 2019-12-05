import { CHANNELS, takeChannel } from "Models/cometd";

const DEFAULT_STATE = {
  wallet: {},
  realityCheck: {},
};

const playerReducer = (state = DEFAULT_STATE, action) => {
  if (takeChannel(CHANNELS.PLAYER)(action)) {
    const { data } = action;

    if (data.realityCheck) {
      return {
        ...state,
        realityCheck: data.realityCheck,
      };
    }
  }

  return state;
};

export default playerReducer;
