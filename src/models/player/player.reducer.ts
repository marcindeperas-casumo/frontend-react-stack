import { CHANNELS, takeChannel } from "Models/cometd";
import { ACTION_TYPES } from "Models/player";

const DEFAULT_STATE = {
  wallet: {},
  financialPosition: {},
  realityCheck: {},
  sessionValid: true,
  sessionStartedTime: null,
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
        lastBalanceUpdateReason: data.walletBalanceUpdated?.source,
      };

      return {
        ...state,
        wallet,
      };
    }

    if (
      data &&
      data.gameSessionNetFinancialPositionChanged &&
      data.gameSessionNetFinancialPositionChanged.totalRealBetAmount &&
      data.gameSessionNetFinancialPositionChanged.totalRealWinAmount
    ) {
      const financialPosition = {
        sessionWinnings:
          data.gameSessionNetFinancialPositionChanged.totalRealWinAmount.amount,
        sessionLoss:
          data.gameSessionNetFinancialPositionChanged.totalRealBetAmount.amount,
      };
      return {
        ...state,
        financialPosition,
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
      sessionStartedTime: null,
    };
  }

  if (action.type === ACTION_TYPES.SET_LOGOUT_STARTED) {
    return {
      ...state,
      logoutStarted: true,
    };
  }

  if (action.type === ACTION_TYPES.SET_SESSION_STARTED) {
    return {
      ...state,
      sessionStartedTime: new Date().getTime(),
    };
  }

  return state;
};

export default playerReducer;
