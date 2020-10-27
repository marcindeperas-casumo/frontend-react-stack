// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { localeSelector } from "Models/handshake";
import {
  useTranslationsGql,
  //useAvailableQuickDepositMethods,
} from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
} from "Models/player";
import { showModal } from "Models/modal";
import { formatCurrency } from "Utils";
import { REACT_APP_MODAL } from "Src/constants";
import { CMS_SLUGS as CMS_SLUG } from "../../models/playing/playing.constants";
import { QuickDeposit } from "./QuickDeposit";

type Props = {
  className?: string,
};

export const QuickDepositContainer = ({ className = "" }: Props) => {
  const { t } = useTranslationsGql({
    bonus_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.bonus_title`,
    balance_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.balance_title`,
    cashier_link_text: `root:${CMS_SLUG.MODAL_WAGERING}:fields.cashier_link_text`,
  });

  // @lukKowalski this will enable or disable using saved methods for quickDeposit (added temporarily)
  const __isQuickDisabled = true;

  const dispatch = useDispatch();
  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const walletBonus = useSelector(playerWalletBonusSelector);
  const savedQuickDepositMethods = []; //useAvailableQuickDepositMethods();
  const navigateToCashier = () => {
    dispatch(showModal(REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION));
  };

  const launchQuickDeposit = () => {
    dispatch(setQuickDepositMethod(savedQuickDepositMethods[0]));
  };

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
      hasSavedPaymentMethods={
        !__isQuickDisabled && savedQuickDepositMethods.length > 0
      }
      onCashierLinkClick={navigateToCashier}
      onQuickDepositLinkClick={launchQuickDeposit}
      className={className}
    />
  );
};
