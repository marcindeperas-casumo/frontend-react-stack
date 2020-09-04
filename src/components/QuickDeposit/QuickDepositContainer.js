// @flow
import React from "react";
import { useSelector } from "react-redux";
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

type Props = {
  cashierLinkCallback: () => null,
};

export const QuickDepositContainer = ({ cashierLinkCallback }: Props) => {
  const trimmedBonusTextFromBalance = true;
  const t: any = useTranslations(CMS_SLUG);
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const walletBonus = useSelector(playerWalletBonusSelector);
  const walletBonusText = useSelector(playerBonusTextSelector);
  const savedPaymentMethods = useSelector(savedMethodsSelector);
  return (
    <QuickDeposit
      t={t}
      walletBalance={formatCurrency({
        locale,
        currency,
        value: playerBalance,
      })}
      bonusBalance={bonusBalanceDisplay(
        walletBonus,
        currency,
        walletBonusText,
        locale,
        trimmedBonusTextFromBalance
      )}
      currency={currency}
      hasSavedPaymentMethods={savedPaymentMethods && savedPaymentMethods.length}
      cashierLinkCallback={cashierLinkCallback}
    />
  );
};
