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
  [CURRENCIES.INR]: WalletTabRupeeUnselectedIcon,
  [CURRENCIES.SEK]: WalletTabKroneUnselectedIcon,
  [CURRENCIES.DKK]: WalletTabKroneUnselectedIcon,
  [CURRENCIES.NZD]: WalletTabDollarUnselectedIcon,
  [CURRENCIES.USD]: WalletTabDollarUnselectedIcon,
};

const VALUABLE_ICON = {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'DEPOSIT' does not exist on type '{}'.
  [VALUABLE_TYPES.DEPOSIT]: DepositBonusIcon,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPINS' does not exist on type '{}'.
  [VALUABLE_TYPES.SPINS]: {
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
    ...ALL_CURRENCIES_ICONS,
  },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
  [VALUABLE_TYPES.CASH]: {
    ...ALL_CURRENCIES_ICONS,
  },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASHBACK' does not exist on type '{}'.
  [VALUABLE_TYPES.CASHBACK]: {
    ...ALL_CURRENCIES_ICONS,
  },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'WAGERING_LOCK' does not exist on type '{... Remove this comment to see the full error message
  [VALUABLE_TYPES.WAGERING_LOCK]: {
    ...ALL_CURRENCIES_ICONS,
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
  },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPORT' does not exist on type '{}'.
  [VALUABLE_TYPES.SPORT]: CouponIcon,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'FREE_BET' does not exist on type '{}'.
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
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
  const CASH_RELATED_VALUABLES = [VALUABLE_TYPES.CASH, VALUABLE_TYPES.CASHBACK];

  const CASH_RELATED_REWARDS = ["bonusMoney", "freeMoney"];
  const SPINS_RELATED_REWARDS = ["spins"];

  const ValuableSymbolComponent = (() => {
    const isSpinRelated =
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'SPINS' does not exist on type '{}'.
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
