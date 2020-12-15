// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useThrottledGameBalance } from "Components/GamePage/Hooks/useThrottledGameBalance";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import {
  localeSelector,
  featureFlagSelector,
  marketSelector,
} from "Models/handshake";
import {
  useTranslationsGql,
  useAvailableQuickDepositMethods,
} from "Utils/hooks";
import {
  playerWalletBonusSelector,
  playerCurrencySelector,
} from "Models/player";
import { CMS_SLUGS as CMS_SLUG } from "Models/playing/playing.constants";
import { showModal } from "Models/modal";
import { formatCurrency } from "Utils";
import { REACT_APP_MODAL } from "Src/constants";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";
import { QuickDeposit } from "./QuickDeposit";

type Props = {
  className?: string,
};

const quickDepositDisabledMarkets = [];

// TODO - to investigate if gameActive is checked and returned first wallet balance updates nicer on the ui rather than in spikes
function gameAwareBalanceCompareFunction(prev, next, isGameActive) {
  if (prev > next) {
    // Return fresh value
    return false;
  } else if (prev === next) {
    // Return cached value
    return true;
  }

  return isGameActive;
}

export const QuickDepositContainer = ({ className = "" }: Props) => {
  const { t } = useTranslationsGql({
    bonus_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.bonus_title`,
    balance_title: `root:${CMS_SLUG.MODAL_WAGERING}:fields.balance_title`,
    cashier_link_text: `root:${CMS_SLUG.MODAL_WAGERING}:fields.cashier_link_text`,
  });

  const dispatch = useDispatch();
  const locale = useSelector(localeSelector);
  const market = useSelector(marketSelector);
  const quickDepositFeatureFlagEnabled = useSelector(
    featureFlagSelector("quick-deposit")
  );
  const showQuickDeposit =
    !quickDepositDisabledMarkets.includes(market) ||
    quickDepositFeatureFlagEnabled;
  const currency = useSelector(playerCurrencySelector);
  const gameActivityAwarePlayerBalance = useThrottledGameBalance<number>(
    gameAwareBalanceCompareFunction
  );
  const bonusBalance = useSelector(playerWalletBonusSelector);
  const gameActivityAwareBonusBalance = useGameActivityAwareValue<number>(
    bonusBalance,
    gameAwareBalanceCompareFunction
  );
  const savedQuickDepositMethods = useAvailableQuickDepositMethods();
  const hasQuickDepositMethods =
    showQuickDeposit && savedQuickDepositMethods.length > 0;
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
        value: gameActivityAwarePlayerBalance,
      })}
      bonusBalance={formatCurrency({
        locale,
        currency,
        value: gameActivityAwareBonusBalance,
      })}
      currency={currency}
      hasSavedPaymentMethods={hasQuickDepositMethods}
      onCashierLinkClick={navigateToCashier}
      onQuickDepositLinkClick={launchQuickDeposit}
      className={className}
    />
  );
};
