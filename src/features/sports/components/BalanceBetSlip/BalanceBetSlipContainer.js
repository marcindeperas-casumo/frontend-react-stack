// @flow
import React from "react";
import { useSelector } from "react-redux";
import {
  playerBalanceAmountSelector,
  playerCurrencySelector,
  playerWalletBonusSelector,
} from "Models/player";
import { formatCurrency } from "Utils";
import { useLocale, useTranslations } from "Utils/hooks";
import { navigateById } from "Services/NavigationService";
import { BalanceBetSlip } from "./BalanceBetSlip";

import "./BalanceBetSlip.scss";

type Props = {
  maximized: boolean,
};

export const BalanceBetSlipContainer = ({ maximized = false }: Props) => {
  const t = useTranslations("iframe-solution");
  const locale = useLocale();
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const bonusBalance = useSelector(playerWalletBonusSelector);

  const goToDeposit = () => navigateById({ routeId: "deposit" });

  const balance = formatCurrency({
    locale,
    currency,
    value: playerBalance,
  });

  const bonus = formatCurrency({
    locale,
    currency,
    value: bonusBalance,
  });

  if (!t || !balance) {
    return null;
  }

  return (
    <BalanceBetSlip
      t={t}
      maximized={maximized}
      goToDeposit={goToDeposit}
      balance={balance}
      bonus={bonusBalance !== 0 ? bonus : undefined}
    />
  );
};
