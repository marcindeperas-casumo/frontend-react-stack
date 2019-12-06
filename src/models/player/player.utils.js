// @flow
import { formatCurrency } from "Utils";

export const balanceAmountDisplay = (
  value: number,
  currency: string,
  locale: string
) => {
  return formatCurrency({ locale, currency, value });
};

export const balanceBonusDisplay = (
  value: number,
  currency: string,
  bonusText: string,
  locale: string
) => {
  return `+${formatCurrency({ locale, currency, value })} ${bonusText}`;
};
