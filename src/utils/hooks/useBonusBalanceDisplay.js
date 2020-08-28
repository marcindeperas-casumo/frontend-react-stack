// @flow
import { formatCurrency } from "Utils";

export const useBonusBalanceDisplay = (
  value: number,
  currency: string,
  bonusText: string,
  locale: string,
  trimmed?: boolean
) => {
  if (!value) {
    return null;
  } else {
    return `+${formatCurrency({ locale, currency, value })} ${
      !trimmed ? bonusText : ""
    }`;
  }
};
