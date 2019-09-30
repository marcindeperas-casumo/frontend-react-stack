import React from "react";
import { either, prop } from "ramda";
import {
  CouponIcon,
  CurrencyCadIcon,
  CurrencyEurIcon,
  CurrencyGbpIcon,
  CurrencyKrnIcon,
  CurrencyRupIcon,
} from "@casumo/cmp-icons";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import {
  DepositIcon,
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
  },
  [VALUABLE_TYPES.SPORT]: CouponIcon,
};

export const ValuableSymbol = ({
  currency,
  valuableType,
  spinType,
  fontSize = "lg",
}) => {
  const ValuableIcon = VALUABLE_ICON[valuableType];

  // eslint-disable-next-line fp/no-let
  let ValuableSymbolComponent = ValuableIcon;

  if (valuableType === VALUABLE_TYPES.SPINS) {
    // eslint-disable-next-line fp/no-mutation
    ValuableSymbolComponent = either(
      prop(spinType),
      prop(VALUABLE_SPIN_TYPES.BASIC_SPINS)
    )(ValuableIcon);
  } else if (valuableType === VALUABLE_TYPES.CASH) {
    // eslint-disable-next-line fp/no-mutation
    ValuableSymbolComponent = either(prop(currency), prop(CURRENCIES.EUR))(
      ValuableIcon
    );
  }

  return <ValuableSymbolComponent size={fontSize} className="u-width--1/1" />;
};
