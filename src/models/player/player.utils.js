import { CURRENCY_CONFIG } from "Src/constants";

const numberToCashFormat = (
  number,
  precision,
  sectionSize,
  sectionSeparator,
  decimalSeparator
) => {
  if (typeof number !== "number") {
    return "";
  }
  const regexString = `\\d(?=(\\d{${sectionSize || 3}})+${
    precision > 0 ? "\\D" : "$"
  })`;
  const numberValue = number.toFixed(Math.max(0, ~~precision));

  return (decimalSeparator
    ? numberValue.replace(".", decimalSeparator)
    : numberValue
  ).replace(new RegExp(regexString, "g"), "$&" + (sectionSeparator || ","));
};

const numberToCurrency = (number, isoCurrency) => {
  const config = CURRENCY_CONFIG[isoCurrency] || CURRENCY_CONFIG["EUR"];
  const numberValue = numberToCashFormat(
    number,
    config["precision"],
    config["sectionSize"],
    config["sectionSeparator"],
    config["decimalSeparator"]
  );

  if (config["currencySymbolFront"]) {
    return `${config["currencySymbol"]}${
      config["currencySymbolSpacing"]
    }${numberValue}`;
  }

  return `${numberValue}${config["currencySymbolSpacing"]}${
    config["currencySymbol"]
  }`;
};

export const balanceAmountDisplay = (amount, isoCurrency) => {
  if (typeof amount !== "number") {
    return "";
  }
  return numberToCurrency(amount, isoCurrency);
};

export const balanceBonusDisplay = (bonus, isoCurrency, bonusText) => {
  if (bonus && typeof bonus === "number") {
    return `+${numberToCurrency(bonus, isoCurrency)} ${bonusText}`;
  } else {
    return bonus;
  }
};
