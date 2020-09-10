// @flow
import React from "react";
import { useSelector } from "react-redux";
import { localeSelector, savedMethodsSelector } from "Models/handshake";
import { useTranslationsGql } from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { bonusBalanceDisplay, formatCurrency } from "Utils";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { QuickDeposit } from "./QuickDeposit";

type Props = {
  cashierLinkCallback: () => null,
};

export const QuickDepositContainer = ({ cashierLinkCallback }: Props) => {
  const trimmedBonusTextFromBalance = true;
  const { t } = useTranslationsGql({
    bonus_title: `root:${CMS_SLUG}:fields.bonus_title`,
    balance_title: `root:${CMS_SLUG}:fields.balance_title`,
    cashier_link_text: `root:${CMS_SLUG}:fields.cashier_link_text`,
  });
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
