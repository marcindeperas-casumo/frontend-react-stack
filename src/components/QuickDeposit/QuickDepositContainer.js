// @flow
import React from "react";
import { connect } from "react-redux";
import { localeSelector, savedMethodsSelector } from "Models/handshake";
import { useTranslations } from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { bonusBalanceDisplay, formatCurrency } from "Utils";
import { CMS_SLUG } from "./QuickDeposit.constants";
import { QuickDeposit } from "./QuickDeposit";

const trimmedBonusTextFromBalance = true;

const QuickDepositContainerWrap = props => {
  const t = useTranslations(CMS_SLUG);
  return <QuickDeposit {...props} t={t} />;
};

export const QuickDepositContainer = connect(state => ({
  walletBalance: formatCurrency({
    locale: localeSelector(state),
    currency: playerCurrencySelector(state),
    value: playerBalanceAmountSelector(state),
  }),
  bonusBalance: bonusBalanceDisplay(
    playerWalletBonusSelector(state),
    playerCurrencySelector(state),
    playerBonusTextSelector(state),
    localeSelector(state),
    trimmedBonusTextFromBalance
  ),
  currency: playerCurrencySelector(state),
  savedPaymentMethods: savedMethodsSelector(state),
}))(QuickDepositContainerWrap);
