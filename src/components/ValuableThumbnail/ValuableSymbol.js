import React from "react";
import { compose, prop } from "ramda";
import Text from "@casumo/cmp-text";
import { CouponIcon } from "@casumo/cmp-icons";
import { getSymbolForCurrency } from "Utils";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import { CURRENCY_SYMBOLS } from "Src/constants";
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
    [CURRENCY_SYMBOLS.CAD]: "",
    [CURRENCY_SYMBOLS.EUR]: "",
    [CURRENCY_SYMBOLS.GBP]: "",
    [CURRENCY_SYMBOLS.DKK]: "", // TODO: confirm
    [CURRENCY_SYMBOLS.INR]: "",
  },
  [VALUABLE_TYPES.SPORT]: CouponIcon,
};

export const ValuableSymbol = ({
  currency,
  market,
  valuableType,
  spinType,
  fontSize = "lg",
}) => {
  const ValuableIcon = VALUABLE_ICON[valuableType];
  // eslint-disable-next-line fp/no-let
  let ValuableSymbolComponent = ValuableIcon;

  if (valuableType === VALUABLE_TYPES.SPINS) {
    // eslint-disable-next-line fp/no-mutation
    ValuableSymbolComponent = compose(prop(spinType))(ValuableIcon);
  } else if (valuableType === VALUABLE_SPIN_TYPES.CASH) {
    // eslint-disable-next-line fp/no-mutation
    ValuableSymbolComponent = compose(prop(currency))(ValuableIcon);
  }

  return <ValuableSymbolComponent className="u-width--1/1" />;
};
