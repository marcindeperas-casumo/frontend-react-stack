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
import { CURRENCIES } from "Src/constants";

type Props = {
  currency: string,
  selected?: boolean,
  classList?: string,
};

const currencyIconMapper = (
  currency: string = CURRENCIES.EUR,
  selected?: boolean,
  classList?: string
) => {
  const currencyComponentSelectedIcons = {
    [CURRENCIES.EUR]: WalletTabEuroSelectedIcon,
    [CURRENCIES.GBP]: WalletTabSterlingSelectedIcon,
    [CURRENCIES.INR]: WalletTabRupeeSelectedIcon,
    [CURRENCIES.USD]: WalletTabDollarSelectedIcon,
    [CURRENCIES.NZD]: WalletTabDollarSelectedIcon,
    [CURRENCIES.CAD]: WalletTabDollarSelectedIcon,
    [CURRENCIES.DKK]: WalletTabKroneSelectedIcon,
    [CURRENCIES.SEK]: WalletTabKroneSelectedIcon,
  };

  const currencyComponentIcons = {
    [CURRENCIES.EUR]: WalletTabEuroUnselectedIcon,
    [CURRENCIES.GBP]: WalletTabSterlingUnselectedIcon,
    [CURRENCIES.INR]: WalletTabRupeeUnselectedIcon,
    [CURRENCIES.USD]: WalletTabDollarUnselectedIcon,
    [CURRENCIES.NZD]: WalletTabDollarUnselectedIcon,
    [CURRENCIES.CAD]: WalletTabDollarUnselectedIcon,
    [CURRENCIES.DKK]: WalletTabKroneUnselectedIcon,
    [CURRENCIES.SEK]: WalletTabKroneUnselectedIcon,
  };
  const IconTagName = selected
    ? currencyComponentSelectedIcons[currency]
    : currencyComponentIcons[currency];
  return <IconTagName className={classList} />;
};

export const CurrencyIcon = ({ currency, selected, classList = "" }: Props) => {
  return currencyIconMapper(currency, selected, classList);
};
