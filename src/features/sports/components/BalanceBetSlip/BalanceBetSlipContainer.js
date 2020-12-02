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
import { BalanceBetSlip } from "Features/sports/components/BalanceBetSlip";

import "./BalanceBetSlip.scss";

type Props = {
  maximized: boolean,
};

export const BalanceBetSlipContainer = ({ maximized = false }: Props) => {
  const locale = useLocale();
  const currency = useSelector(playerCurrencySelector);
  const playerBalance = useSelector(playerBalanceAmountSelector);
  const bonusBalance = useSelector(playerWalletBonusSelector);

  const t = useTranslations("iframe-solution");

  const goToDeposit = () => navigateById({ routeId: "deposit" });

  return (
    <BalanceBetSlip
      t={t}
      maximized={maximized}
      goToDeposit={goToDeposit}
      balance={formatCurrency({
        locale,
        currency,
        value: playerBalance,
      })}
      bonus={
        bonusBalance !== 0
          ? formatCurrency({
              locale,
              currency,
              value: bonusBalance,
            })
          : null
      }
    />
  );
};
