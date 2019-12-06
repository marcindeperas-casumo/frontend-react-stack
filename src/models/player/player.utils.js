// @flow
import { formatCurrency } from "Utils";

export const balanceBonusDisplay = (
  value: number,
  currency: string,
  bonusText: string,
  locale: string
) => {
  return `+${formatCurrency({ locale, currency, value })} ${bonusText}`;
};
