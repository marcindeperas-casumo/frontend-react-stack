// @flow
import React from "react";
import { useSelector } from "react-redux";
import { localeSelector } from "Models/handshake";
import {
  useTranslationsGql,
  // useAvailableQuickDepositMethods,
  useCrossCodebaseNavigation,
} from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
} from "Models/player";
import { formatCurrency } from "Utils";
import { ROUTE_IDS } from "Src/constants";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { QuickDeposit } from "./QuickDeposit";

type Props = {
  classNames?: string,
};

export const QuickDepositContainer = ({ classNames = "" }: Props) => {
  const { t } = useTranslationsGql({
    bonus_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.bonus_title`,
    balance_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.balance_title`,
    cashier_link_text: `root:${CMS_SLUG.MODAL_WAGERING}:fields.cashier_link_text`,
  });
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const walletBonus = useSelector(playerWalletBonusSelector);
  // Setting only one user journey till quick deposit functionlaity is ready
  // const savedQuickDepositMethods = useAvailableQuickDepositMethods();
  const savedQuickDepositMethods = [];
  const { navigateToKO } = useCrossCodebaseNavigation();
  const navigateToCashier = () => {
    navigateToKO(ROUTE_IDS.CASH_DEPOSIT);
  };
  const launchQuickDeposit = () => {};

  return (
    <QuickDeposit
      t={t}
      walletBalance={formatCurrency({
        locale,
        currency,
        value: playerBalance,
      })}
      bonusBalance={formatCurrency({
        locale,
        currency,
        value: walletBonus,
      })}
      currency={currency}
      hasSavedPaymentMethods={savedQuickDepositMethods.length > 0}
      onCashierLinkClick={navigateToCashier}
      onQuickDepositLinkClick={launchQuickDeposit}
      classNames={classNames}
    />
  );
};
