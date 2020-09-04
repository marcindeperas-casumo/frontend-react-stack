// @flow
import * as React from "react";
import {
  WalletTabEuroSelectedIcon,
  WalletTabEuroUnselectedIcon,
  WalletTabSterlingSelectedIcon,
  WalletTabSterlingUnselectedIcon,
  WalletTabRupeeSelectedIcon,
  WalletTabRupeeUnselectedIcon,
  WalletTabKroneSelectedIcon,
  WalletTabKroneUnselectedIcon,
  WalletTabDollarSelectedIcon,
  WalletTabDollarUnselectedIcon,
} from "@casumo/cmp-icons";

type Props = {
  currency: string,
  selected?: boolean,
  classList?: string,
};

const currencyIconMapper = (
  currency: string = "EUR",
  selected?: boolean,
  classList?: string
) => {
  const currencyComponentSelectedIcons = {
    EUR: WalletTabEuroSelectedIcon,
    GBP: WalletTabSterlingSelectedIcon,
    INR: WalletTabRupeeSelectedIcon,
    NOK: WalletTabKroneSelectedIcon,
    USD: WalletTabDollarSelectedIcon,
  };

  const currencyComponentIcons = {
    EUR: WalletTabEuroUnselectedIcon,
    GBP: WalletTabSterlingUnselectedIcon,
    INR: WalletTabRupeeUnselectedIcon,
    NOK: WalletTabKroneUnselectedIcon,
    USD: WalletTabDollarUnselectedIcon,
  };
  const IconTagName = selected
    ? currencyComponentSelectedIcons[currency]
    : currencyComponentIcons[currency];
  return <IconTagName className={classList} />;
};

export const CurrencyIcon = ({ currency, selected, classList = "" }: Props) => {
  return currencyIconMapper(currency, selected, classList);
};
