// @flow
import React from "react";
import { connect, useSelector } from "react-redux";
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

export const QuickDepositContainer = connect(state => {
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const walletBonus = useSelector(playerWalletBonusSelector);
  const walletBonusText = playerBonusTextSelector(state);
  const savedPaymentMethods = savedMethodsSelector(state);
  return {
    walletBalance: formatCurrency({
      locale,
      currency,
      value: playerBalance,
    }),
    bonusBalance: bonusBalanceDisplay(
      walletBonus,
      currency,
      walletBonusText,
      locale,
      trimmedBonusTextFromBalance
    ),
    currency: currency,
    hasSavedPaymentMethods: savedPaymentMethods && savedPaymentMethods.length,
  };
})(QuickDepositContainerWrap);
