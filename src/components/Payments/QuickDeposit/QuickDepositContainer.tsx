import React from "react";
import { useSelector } from "react-redux";
import { useThrottledGameBalance } from "Components/GamePage/Hooks/useThrottledGameBalance";
import { localeSelector } from "Models/handshake";
import { useTranslationsGql } from "Utils/hooks";
import {
  playerWalletBonusSelector,
  playerCurrencySelector,
} from "Models/player";
import { CMS_SLUGS as CMS_SLUG } from "Models/playing/playing.constants";
import { formatCurrency } from "Utils";
import { useGameActivityAwareValue } from "Components/GamePage/Hooks/useGameActivityAwareValue";
import { useDepositMethods } from "Utils/hooks/useDepositMethods";
import { QuickDeposit } from "./QuickDeposit";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";

type Props = {
  className?: string;
};

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

  const locale = useSelector(localeSelector);
  const currency = useSelector(playerCurrencySelector);
  const gameActivityAwarePlayerBalance = useThrottledGameBalance(
    gameAwareBalanceCompareFunction
  );
  const bonusBalance = useSelector(playerWalletBonusSelector);
  const gameActivityAwareBonusBalance = useGameActivityAwareValue(
    bonusBalance,
    gameAwareBalanceCompareFunction
  );

  const {
    hasQuickDepositMethods,
    navigateToCashier,
    launchQuickDeposit,
  } = useDepositMethods();

  const cashierLinkClickHandler = () => {
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_CURRENCY_SIGN_CLICKED, {});
    tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_STARTED, {});
    navigateToCashier();
  };

  const launchQuickDepositHandler = () => {
    tracker.track(EVENTS.MIXPANEL_CASHIER_LINK_CLICKED, {});
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_PROCESS_INITIATED, {});
    launchQuickDeposit();
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
      onCashierLinkClick={cashierLinkClickHandler}
      onQuickDepositLinkClick={launchQuickDepositHandler}
      className={className}
    />
  );
};
