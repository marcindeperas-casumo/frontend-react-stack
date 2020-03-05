import { CHANNELS, takeChannel } from "Models/cometd";
import { ACTION_TYPES } from "Models/player";

const DEFAULT_STATE = {
  wallet: {},
  realityCheck: {},
  sessionValid: true,
  logoutStarted: false,
};

const playerReducer = (state = DEFAULT_STATE, action) => {
  if (takeChannel(CHANNELS.PLAYER)(action)) {
    const { data } = action;

    if (
      data &&
      data.walletBalanceUpdated &&
      data.walletBalanceUpdated.updatedBalance
    ) {
      const wallet = {
        amount: data.walletBalanceUpdated.updatedBalance.realBalance.amount,
        bonus: data.walletBalanceUpdated.updatedBalance.bonusBalance.amount,
        iso4217CurrencyCode:
          data.walletBalanceUpdated.updatedBalance.realBalance
            .iso4217CurrencyCode,
      };
      return {
        ...state,
        wallet,
      };
    }

    if (data.realityCheck) {
      return {
        ...state,
        realityCheck: data.realityCheck,
      };
    }
  }

  if (takeChannel(CHANNELS.SESSION_ENDED)(action)) {
    return {
      ...state,
      sessionValid: false,
    };
  }

  if (action.type === ACTION_TYPES.SET_LOGOUT_STARTED) {
    return {
      ...state,
      logoutStarted: true,
    };
  }

  return state;
};

export default playerReducer;
