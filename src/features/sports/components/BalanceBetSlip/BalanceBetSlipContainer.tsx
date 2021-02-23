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
import { navigateToDeposit } from "Features/sports/utils";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS } from "Src/constants";
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

  const balance = formatCurrency({
    locale,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
    currency,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
    value: playerBalance,
  });

  const bonus = formatCurrency({
    locale,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
    currency,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
    value: bonusBalance,
  });

  const goToDeposit = () => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_BETSLIP_DEPOSIT_CLICKED, {
      [EVENT_PROPS.BALANCE]: balance,
    });
    navigateToDeposit();
  };

  return (
    <BalanceBetSlip
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      t={t}
      maximized={maximized}
      goToDeposit={goToDeposit}
      balance={balance}
      bonus={bonusBalance !== 0 ? bonus : undefined}
    />
  );
};
