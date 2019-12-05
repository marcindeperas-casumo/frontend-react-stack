import { formatCurrency } from "Utils";

export const balanceAmountDisplay = (amount, isoCurrency, locale) => {
  if (typeof amount !== "number") {
    return "";
  }
  return formatCurrency(locale, isoCurrency, amount);
};

export const balanceBonusDisplay = (bonus, isoCurrency, bonusText, locale) => {
  if (bonus && typeof bonus === "number") {
    return `+${formatCurrency(locale, isoCurrency, bonus)} ${bonusText}`;
  } else {
    return bonus;
  }
};
