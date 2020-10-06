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
    [CURRENCIES.DKK]: WalletTabKroneSelectedIcon,
    [CURRENCIES.SEK]: WalletTabKroneSelectedIcon,
    [CURRENCIES.USD]: WalletTabDollarSelectedIcon,
    [CURRENCIES.NZD]: WalletTabDollarSelectedIcon,
    [CURRENCIES.CAD]: WalletTabDollarSelectedIcon,
  };

  const currencyComponentIcons = {
    [CURRENCIES.EUR]: WalletTabEuroUnselectedIcon,
    [CURRENCIES.GBP]: WalletTabSterlingUnselectedIcon,
    [CURRENCIES.INR]: WalletTabRupeeUnselectedIcon,
    [CURRENCIES.DKK]: WalletTabKroneUnselectedIcon,
    [CURRENCIES.SEK]: WalletTabKroneUnselectedIcon,
    [CURRENCIES.USD]: WalletTabDollarUnselectedIcon,
    [CURRENCIES.NZD]: WalletTabDollarUnselectedIcon,
    [CURRENCIES.CAD]: WalletTabDollarUnselectedIcon,
  };
  const IconTagName = selected
    ? currencyComponentSelectedIcons[currency]
    : currencyComponentIcons[currency];
  return <IconTagName className={classList} />;
};

export const CurrencyIcon = ({ currency, selected, classList = "" }: Props) => {
  return currencyIconMapper(currency, selected, classList);
};
