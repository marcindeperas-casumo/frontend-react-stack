// @flow
import { connect } from "react-redux";
import { localeSelector } from "Models/handshake";
import { useTranslations, useBonusBalanceDisplay } from "Utils/hooks";
import { formatCurrency } from "Utils";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { CMS_SLUG } from "./QuickDeposit.constants";
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
    t: useTranslations(CMS_SLUG),
  }),
  {
    savedPaymentMethods: true,
  }
)(QuickDeposit);

export default QuickDepositContainer;
