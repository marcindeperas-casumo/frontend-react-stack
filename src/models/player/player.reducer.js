// eslint-disable-next-line filenames/match-exported
import { CHANNELS, takeChannel } from "Models/cometd";

const DEFAULT_STATE = {
  wallet: {},
};

const playerBalandeReducer = (state = DEFAULT_STATE, action) => {
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
  }

  return state;
};

export default playerBalandeReducer;
