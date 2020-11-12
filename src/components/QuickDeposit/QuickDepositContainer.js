// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { localeSelector, featureFlagSelector } from "Models/handshake";
import {
  useTranslationsGql,
  useAvailableQuickDepositMethods,
} from "Utils/hooks";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
} from "Models/player";
import { showModal } from "Models/modal";
import { formatCurrency } from "Utils";
import { REACT_APP_MODAL } from "Src/constants";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";
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

  const dispatch = useDispatch();
  const locale = useSelector(localeSelector);
  const quickDepositEnabled = useSelector(featureFlagSelector("quick-deposit"));
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const gameAwareBalanceCompareFunction = (prev, next, isGameActive) => {
    if (prev > next) {
      // Return fresh value
      return false;
    } else if (prev === next) {
      // Return cached value
      return true;
    }

    return isGameActive;
  };
  const gameAwarePlayerBalance = useGameActivityAwareValue(
    playerBalance,
    gameAwareBalanceCompareFunction
  );
  const bonusBalance = useSelector(playerWalletBonusSelector);
  const gameAwareBonusBalance = useGameActivityAwareValue(
    bonusBalance,
    gameAwareBalanceCompareFunction
  );
  const savedQuickDepositMethods = useAvailableQuickDepositMethods();
  const hasQuickDepositMethods =
    quickDepositEnabled && savedQuickDepositMethods.length > 0;
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
        value: gameAwarePlayerBalance,
      })}
      bonusBalance={formatCurrency({
        locale,
        currency,
        value: gameAwareBonusBalance,
      })}
      currency={currency}
      hasSavedPaymentMethods={hasQuickDepositMethods}
      onCashierLinkClick={navigateToCashier}
      onQuickDepositLinkClick={launchQuickDeposit}
      className={className}
    />
  );
};
