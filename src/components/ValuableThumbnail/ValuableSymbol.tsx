import {
  CouponIcon,
  DepositBonusIcon,
  DollarIcon,
  EuroIcon,
  KronaIcon,
  PoundIcon,
  RupeeIcon,
} from "@casumo/cmp-icons";
import React from "react";
import classNames from "classnames";
import * as A from "Types/apollo";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import {
  BasicSpinsIcon,
  BonusSpinsIcon,
  SuperSpinsIcon,
  MegaSpinsIcon,
  ChristmasSpecial,
  ChristmasSnowflakeGold,
  ChristmasSnowflakeSilver,
} from "./icons";

const ALL_CURRENCIES_ICONS = {
  [CURRENCIES.CAD]: DollarIcon,
  [CURRENCIES.EUR]: EuroIcon,
  [CURRENCIES.GBP]: PoundIcon,
  [CURRENCIES.INR]: RupeeIcon,
  [CURRENCIES.NOK]: KronaIcon,
  [CURRENCIES.SEK]: KronaIcon,
  [CURRENCIES.DKK]: KronaIcon,
  [CURRENCIES.NZD]: DollarIcon,
  [CURRENCIES.USD]: DollarIcon,
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
  [VALUABLE_TYPES.CHRISTMAS_SPECIAL]: ChristmasSpecial,
  [VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_SILVER]: ChristmasSnowflakeSilver,
  [VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_GOLD]: ChristmasSnowflakeGold,
};

export type AllValuableType =
  | A.ValuableType
  | typeof VALUABLE_TYPES.CHRISTMAS_SPECIAL
  | typeof VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_SILVER
  | typeof VALUABLE_TYPES.CHRISTMAS_SPECIAL_DEPOSIT_GOLD;

type Props = {
  awardType?: A.WageringLockAwardType;
  currency: string;
  valuableType: AllValuableType;
  spinType?: string;
  size?: string;
};

export const ValuableSymbol = ({
  awardType,
  currency,
  valuableType,
  spinType,
  size = "md",
}: Props) => {
  const ValuableIcon = VALUABLE_ICON[valuableType];
  const CASH_RELATED_VALUABLES = [
    VALUABLE_TYPES.CASH,
    VALUABLE_TYPES.CASHBACK,
  ] as Array<AllValuableType>;

  const CASH_RELATED_REWARDS = ["bonusMoney", "freeMoney"];
  const SPINS_RELATED_REWARDS = ["spins"];

  const isCashRelated =
    CASH_RELATED_VALUABLES.includes(valuableType) ||
    CASH_RELATED_REWARDS.includes(awardType);

  const ValuableSymbolComponent = (() => {
    const isSpinRelated =
      VALUABLE_TYPES.SPINS === valuableType ||
      SPINS_RELATED_REWARDS.includes(awardType);

    if (isSpinRelated) {
      return ValuableIcon[spinType || VALUABLE_SPIN_TYPES.BASIC_SPINS];
    }

    if (isCashRelated) {
      return ValuableIcon[currency] || ValuableIcon[CURRENCIES.EUR];
    }

    return ValuableIcon;
  })();

  if (!ValuableSymbolComponent) {
    return null;
  }

  return (
    <ValuableSymbolComponent
      type={valuableType}
      size={size}
      className={classNames("u-width--full", {
        "c-valuable-symbol--fill ": isCashRelated,
      })}
    />
  );
};
