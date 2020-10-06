/* @flow */
import React from "react";
import {
  CouponIcon,
  WalletTabDollarUnselectedIcon,
  WalletTabEuroUnselectedIcon,
  WalletTabSterlingUnselectedIcon,
  WalletTabKroneUnselectedIcon,
  WalletTabRupeeUnselectedIcon,
  DepositBonusIcon,
} from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import {
  BasicSpinsIcon,
  BonusSpinsIcon,
  SuperSpinsIcon,
  MegaSpinsIcon,
} from "./icons";

const ALL_CURRENCIES_ICONS = {
  [CURRENCIES.CAD]: WalletTabDollarUnselectedIcon,
  [CURRENCIES.EUR]: WalletTabEuroUnselectedIcon,
  [CURRENCIES.GBP]: WalletTabSterlingUnselectedIcon,
  [CURRENCIES.DKK]: WalletTabKroneUnselectedIcon,
  [CURRENCIES.INR]: WalletTabRupeeUnselectedIcon,
  [CURRENCIES.SEK]: WalletTabKroneUnselectedIcon,
  [CURRENCIES.DKK]: WalletTabKroneUnselectedIcon,
  [CURRENCIES.NZD]: WalletTabDollarUnselectedIcon,
  [CURRENCIES.USD]: WalletTabDollarUnselectedIcon,
};

const VALUABLE_ICON = {
  [VALUABLE_TYPES.DEPOSIT]: DepositBonusIcon,
  [VALUABLE_TYPES.SPINS]: {
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
    ...ALL_CURRENCIES_ICONS,
  },
  [VALUABLE_TYPES.CASH]: {
    ...ALL_CURRENCIES_ICONS,
  },
  [VALUABLE_TYPES.CASHBACK]: {
    ...ALL_CURRENCIES_ICONS,
  },
  [VALUABLE_TYPES.WAGERING_LOCK]: {
    ...ALL_CURRENCIES_ICONS,
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
  },
  [VALUABLE_TYPES.SPORT]: CouponIcon,
  [VALUABLE_TYPES.FREE_BET]: CouponIcon,
};

type Props = {
  awardType?: A.WageringLockAwardType,
  currency: string,
  valuableType: A.ValuableType,
  spinType: string,
  size: string,
};

export const ValuableSymbol = ({
  awardType,
  currency,
  valuableType,
  spinType,
  size = "md",
}: Props) => {
  const ValuableIcon = VALUABLE_ICON[valuableType];
  const CASH_RELATED_VALUABLES = [VALUABLE_TYPES.CASH, VALUABLE_TYPES.CASHBACK];

  const CASH_RELATED_REWARDS = ["bonusMoney", "freeMoney"];
  const SPINS_RELATED_REWARDS = ["spins"];

  const ValuableSymbolComponent = (() => {
    const isSpinRelated =
      VALUABLE_TYPES.SPINS === valuableType ||
      SPINS_RELATED_REWARDS.includes(awardType);

    if (isSpinRelated) {
      // $FlowFixMe
      return ValuableIcon[spinType || VALUABLE_SPIN_TYPES.BASIC_SPINS];
    }

    const isCashRelated =
      CASH_RELATED_VALUABLES.includes(valuableType) ||
      CASH_RELATED_REWARDS.includes(awardType);

    if (isCashRelated) {
      // $FlowFixMe
      return ValuableIcon[currency] || ValuableIcon[CURRENCIES.EUR];
    }

    return ValuableIcon;
  })();

  return (
    // $FlowFixMe
    <ValuableSymbolComponent
      type={valuableType}
      size={size}
      className="u-width--full"
    />
  );
};
