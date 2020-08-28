// @flow
import React from "react";
import { connect } from "react-redux";
import { localeSelector, savedMethodsSelector } from "Models/handshake";
import { useBonusBalanceDisplay, useTranslations } from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { formatCurrency } from "Utils";
import { CMS_SLUG } from "./QuickDeposit.constants";
import { QuickDeposit } from "./QuickDeposit";

const trimmedBonusTextFromBalance = true;

const QuickDepositContainer = props => {
  const t = useTranslations(CMS_SLUG);
  return <QuickDeposit {...props} t={t} />;
};

export default connect(state => ({
  walletBalance: formatCurrency({
    locale: localeSelector(state),
    currency: playerCurrencySelector(state),
    value: playerBalanceAmountSelector(state),
  }),
  bonusBalance: useBonusBalanceDisplay(
    playerWalletBonusSelector(state),
    playerCurrencySelector(state),
    playerBonusTextSelector(state),
    localeSelector(state),
    trimmedBonusTextFromBalance
  ),
  currency: playerCurrencySelector(state),
  savedPaymentMethods: savedMethodsSelector(state),
}))(QuickDepositContainer);
