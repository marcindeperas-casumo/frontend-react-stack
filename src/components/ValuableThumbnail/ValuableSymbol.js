import React from "react";
import { either, prop, cond, T, equals, anyPass } from "ramda";
import {
  CouponIcon,
  WalletTabDollarUnselectedIcon,
  WalletTabEuroUnselectedIcon,
  WalletTabSterlingUnselectedIcon,
  WalletTabKroneUnselectedIcon,
  WalletTabRupeeUnselectedIcon,
  DepositBonusIcon,
} from "@casumo/cmp-icons";
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
  },
  [VALUABLE_TYPES.CASH]: {
    ...ALL_CURRENCIES_ICONS,
  },
  [VALUABLE_TYPES.CASHBACK]: {
    ...ALL_CURRENCIES_ICONS,
  },
  [VALUABLE_TYPES.WAGERING_LOCK]: {
    ...ALL_CURRENCIES_ICONS,
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
      anyPass([
        equals(VALUABLE_TYPES.CASH),
        equals(VALUABLE_TYPES.CASHBACK),
        equals(VALUABLE_TYPES.WAGERING_LOCK),
      ]),
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
