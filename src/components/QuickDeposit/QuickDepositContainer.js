// @flow
import { connect } from "react-redux";
import { localeSelector } from "Models/handshake";
import { useBonusBalanceDisplay } from "Utils/hooks";
import { formatCurrency } from "Utils";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { QuickDeposit } from "./QuickDeposit";

const QuickDepositContainer = connect(
  state => ({
    walletBalance: formatCurrency({
      locale: localeSelector(state),
      currency: playerCurrencySelector(state),
      value: playerBalanceAmountSelector(state),
    }),
    bonusBalance: useBonusBalanceDisplay(
      playerWalletBonusSelector(state),
      playerCurrencySelector(state),
      playerBonusTextSelector(state),
      localeSelector(state)
    ),
    currency: playerCurrencySelector(state),
  }),
  {
    savedPaymentMethods: true,
  }
)(QuickDeposit);

export default QuickDepositContainer;
