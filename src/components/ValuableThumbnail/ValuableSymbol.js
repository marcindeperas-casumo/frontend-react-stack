import React from "react";
import { either, prop, cond, T, equals, anyPass } from "ramda";
import {
  CouponIcon,
  CurrencyCadIcon,
  CurrencyEurIcon,
  CurrencyGbpIcon,
  CurrencyKrnIcon,
  CurrencyRupIcon,
  DepositIcon,
} from "@casumo/cmp-icons";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import {
  BasicSpinsIcon,
  BonusSpinsIcon,
  SuperSpinsIcon,
  MegaSpinsIcon,
} from "./icons";

const VALUABLE_ICON = {
  [VALUABLE_TYPES.DEPOSIT]: DepositIcon,
  [VALUABLE_TYPES.SPINS]: {
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
  },
  [VALUABLE_TYPES.CASH]: {
    [CURRENCIES.CAD]: CurrencyCadIcon,
    [CURRENCIES.EUR]: CurrencyEurIcon,
    [CURRENCIES.GBP]: CurrencyGbpIcon,
    [CURRENCIES.DKK]: CurrencyKrnIcon,
    [CURRENCIES.INR]: CurrencyRupIcon,
    [CURRENCIES.SEK]: CurrencyKrnIcon,
    [CURRENCIES.DKK]: CurrencyKrnIcon,
    [CURRENCIES.NZD]: CurrencyCadIcon,
    [CURRENCIES.USD]: CurrencyCadIcon,
  },
  [VALUABLE_TYPES.CASHBACK]: {
    [CURRENCIES.CAD]: CurrencyCadIcon,
    [CURRENCIES.EUR]: CurrencyEurIcon,
    [CURRENCIES.GBP]: CurrencyGbpIcon,
    [CURRENCIES.DKK]: CurrencyKrnIcon,
    [CURRENCIES.INR]: CurrencyRupIcon,
    [CURRENCIES.SEK]: CurrencyKrnIcon,
    [CURRENCIES.DKK]: CurrencyKrnIcon,
    [CURRENCIES.NZD]: CurrencyCadIcon,
    [CURRENCIES.USD]: CurrencyCadIcon,
  },
  [VALUABLE_TYPES.SPORT]: CouponIcon,
  [VALUABLE_TYPES.FREE_BET]: CouponIcon,
};

export const ValuableSymbol = ({
  currency,
  valuableType,
  spinType,
  size = "md",
}) => {
  const ValuableIcon = VALUABLE_ICON[valuableType];

  const ValuableSymbolComponent = cond([
    [
      equals(VALUABLE_TYPES.SPINS),
      () =>
        either(prop(spinType), prop(VALUABLE_SPIN_TYPES.BASIC_SPINS))(
          ValuableIcon
        ),
    ],
    [
      anyPass([equals(VALUABLE_TYPES.CASH), equals(VALUABLE_TYPES.CASHBACK)]),
      () => either(prop(currency), prop(CURRENCIES.EUR))(ValuableIcon),
    ],
    [T, () => ValuableIcon],
  ])(valuableType);

  return (
    <ValuableSymbolComponent
      type={valuableType}
      size={size}
      className="u-width--full"
    />
  );
};
