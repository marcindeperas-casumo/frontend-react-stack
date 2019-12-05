import { formatCurrency } from "Utils";

export const balanceAmountDisplay = (value, currency, locale) => {
  if (value && typeof value !== "number") {
    return "";
  }
  return formatCurrency({ locale, currency, value });
};

export const balanceBonusDisplay = (value, currency, bonusText, locale) => {
  if (value && typeof value === "number") {
    return `+${formatCurrency({ locale, currency, value })} ${bonusText}`;
  } else {
    return value;
  }
};
